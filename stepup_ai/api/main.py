from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

import tensorflow as tf
import pandas as pd
import numpy as np
import pickle
import re
import ast
import os
import json

from sklearn.metrics.pairwise import cosine_similarity


@tf.keras.utils.register_keras_serializable(package="StepUp")
class L2NormalizeLayer(tf.keras.layers.Layer):
    def call(self, inputs):
        return tf.math.l2_normalize(inputs, axis=1)


app = FastAPI(title="StepUp AI Recommendation API")


MODEL_PATH = "stepup_artifacts/stepup_match_score_model.keras"
TFIDF_PATH = "stepup_artifacts/tfidf_vectorizer_core.pkl"
TFIDF_DL_PATH = "stepup_artifacts/tfidf_vectorizer_dl.pkl"
NUMERIC_MAX_PATH = "stepup_artifacts/numeric_max.pkl"
JOB_CATALOG_PATH = "stepup_artifacts/job_catalog.pkl"


try:
    model = tf.keras.models.load_model(
        MODEL_PATH,
        compile=False,
        custom_objects={"L2NormalizeLayer": L2NormalizeLayer},
        safe_mode=False
    )
    MODEL_LOADED = True
    print("MODEL LOADED SUCCESSFULLY")
except Exception as e:
    model = None
    MODEL_LOADED = False
    print("MODEL LOAD FAILED:", e)

with open(TFIDF_PATH, "rb") as f:
    tfidf_vectorizer = pickle.load(f)

with open(TFIDF_DL_PATH, "rb") as f:
    tfidf_vectorizer_dl = pickle.load(f)

with open(NUMERIC_MAX_PATH, "rb") as f:
    numeric_max = pickle.load(f)

job_catalog = pd.read_pickle(JOB_CATALOG_PATH)


def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9 ]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def parse_skill_list(value):
    if isinstance(value, list):
        return [
            clean_text(item)
            for item in value
            if clean_text(item) and clean_text(item) != "nan"
        ]

    if value is None or pd.isna(value):
        return []

    value = str(value).strip()

    if value == "" or value.lower() == "nan":
        return []

    try:
        parsed = ast.literal_eval(value)
        if isinstance(parsed, list):
            return [
                clean_text(item)
                for item in parsed
                if clean_text(item) and clean_text(item) != "nan"
            ]
    except Exception:
        pass

    if "," in value:
        return [
            clean_text(item)
            for item in value.split(",")
            if clean_text(item) and clean_text(item) != "nan"
        ]

    return [clean_text(value)] if clean_text(value) else []


def build_user_text(profile):
    sections = []
    sections.extend(profile.get("hard_skills", []))
    sections.extend(profile.get("soft_skills", []))
    sections.extend(profile.get("projects", []))
    sections.extend(profile.get("internships", []))
    sections.extend(profile.get("organizations", []))
    sections.extend(profile.get("certifications", []))

    if profile.get("major"):
        sections.append(profile["major"])

    if profile.get("education"):
        sections.append(profile["education"])

    return clean_text(" ".join(sections))


def build_job_text(row):
    hard_skills = row.get("required_hard_skills_user_list", [])
    soft_skills = row.get("required_soft_skills_list", [])

    if isinstance(hard_skills, list):
        hard_skills = " ".join(hard_skills)

    if isinstance(soft_skills, list):
        soft_skills = " ".join(soft_skills)

    job_text = (
        str(row.get("job_role", "")) + " " +
        str(row.get("category", "")) + " " +
        str(hard_skills) + " " +
        str(soft_skills)
    )

    return clean_text(job_text)


def make_numeric_features(profile):
    semester = profile.get("semester", 0)
    gpa = profile.get("gpa", 0.0)

    num_projects = len(profile.get("projects", []))
    num_internships = len(profile.get("internships", []))
    num_certifications = len(profile.get("certifications", []))
    num_organizations = len(profile.get("organizations", []))

    numeric_features = np.array([
        semester,
        gpa,
        num_projects,
        num_internships,
        num_certifications,
        num_organizations
    ]).astype("float32")

    numeric_features = numeric_features / numeric_max
    return numeric_features.reshape(1, -1)


def calculate_gap(user_skills, required_skills):
    user_set = set(parse_skill_list(user_skills))
    required_set = set(parse_skill_list(required_skills))

    matched = sorted(list(user_set & required_set))
    missing = sorted(list(required_set - user_set))

    return {
        "matched": matched,
        "missing": missing
    }


def calculate_skill_coverage(profile, row):
    user_hard = set(parse_skill_list(profile.get("hard_skills", [])))
    user_soft = set(parse_skill_list(profile.get("soft_skills", [])))

    required_hard = set(parse_skill_list(row.get("required_hard_skills_user_list", [])))
    required_soft = set(parse_skill_list(row.get("required_soft_skills_list", [])))

    user_all = user_hard | user_soft
    required_all = required_hard | required_soft

    if not required_all:
        return 0.0

    matched = user_all & required_all
    return len(matched) / len(required_all)


def predict_final_recommendation(profile):
    user_text = build_user_text(profile)
    user_vector_core = tfidf_vectorizer.transform([user_text]).toarray()
    user_vector_dl = tfidf_vectorizer_dl.transform([user_text]).toarray()
    user_numeric = make_numeric_features(profile)

    recommendations = []

    for _, row in job_catalog.iterrows():
        job_text = build_job_text(row)
        job_vector_core = tfidf_vectorizer.transform([job_text]).toarray()
        job_vector_dl = tfidf_vectorizer_dl.transform([job_text]).toarray()

        if MODEL_LOADED and model is not None:
            dl_score = model.predict(
                [user_vector_dl, job_vector_dl, user_numeric],
                verbose=0
            )
            dl_score = float(dl_score[0][0])
        else:
            dl_score = float(cosine_similarity(user_vector_core, job_vector_core)[0][0])

            dl_score = max(0.0, min(dl_score, 1.0))

        cosine_score = cosine_similarity(user_vector_core, job_vector_core)[0][0]
        cosine_score = max(0.0, min(float(cosine_score), 1.0))

        user_words = set(user_text.split())
        job_words = set(job_text.split())
        matched_keywords = user_words.intersection(job_words)

        keyword_bonus = min(len(matched_keywords) * 0.035, 0.20)

        skill_coverage_score = calculate_skill_coverage(profile, row)

        final_score = (
            cosine_score * 0.25 +
            dl_score * 0.20 +
            skill_coverage_score * 0.45 +
            keyword_bonus
        )

        final_score = max(0.0, min(final_score, 1.0))
        final_score_percent = round(final_score * 100, 2)

        recommendations.append({
            "job_role": row["job_role"],
            "category": row["category"],
            "match_score": final_score_percent,
            "score_detail": {
                "cosine_score": round(cosine_score * 100, 2),
                "deep_learning_score": round(dl_score * 100, 2),
                "skill_coverage_score": round(skill_coverage_score * 100, 2),
                "keyword_bonus": round(keyword_bonus * 100, 2)
            }
        })

    recommendations = sorted(
        recommendations,
        key=lambda x: x["match_score"],
        reverse=True
    )

    final_jobs = []
    used_roles = set()

    for item in recommendations:
        if item["job_role"] not in used_roles:
            used_roles.add(item["job_role"])
            final_jobs.append(item)

        if len(final_jobs) == 3:
            break

    top_job = final_jobs[0]

    target_row = job_catalog[
        job_catalog["job_role"] == top_job["job_role"]
    ].iloc[0]

    required_hard_skills = parse_skill_list(
        target_row.get("required_hard_skills_user_list", [])
    )

    required_soft_skills = parse_skill_list(
        target_row.get("required_soft_skills_list", [])
    )

    user_hard_skills = parse_skill_list(
        profile.get("hard_skills", [])
    )

    user_soft_skills = parse_skill_list(
        profile.get("soft_skills", [])
    )

    hard_skill_gap = calculate_gap(
        user_hard_skills,
        required_hard_skills
    )

    soft_skill_gap = calculate_gap(
        user_soft_skills,
        required_soft_skills
    )

    all_missing_skills = (
        hard_skill_gap["missing"] +
        soft_skill_gap["missing"]
    )

    all_missing_skills = list(dict.fromkeys(all_missing_skills))[:5]

    affirmation = (
        f"Kamu sudah memiliki dasar skill yang cukup baik "
        f"untuk bidang {top_job['job_role']}. "
        f"Untuk meningkatkan peluang kariermu, "
        f"kamu bisa mempelajari beberapa skill berikut."
    )

    skill_gap = {
        "affirmation": affirmation,
        "hard_skill_gap": hard_skill_gap,
        "soft_skill_gap": soft_skill_gap,
        "missing_skills": all_missing_skills
    }

    return {
        "top_3_recommendations": final_jobs,
        "skill_gap": skill_gap
    }


class UserProfile(BaseModel):
    name: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""
    linkedin: Optional[str] = ""
    location: Optional[str] = ""
    major: Optional[str] = ""
    education: Optional[str] = ""
    semester: Optional[int] = 0
    gpa: Optional[float] = 0.0
    hard_skills: List[str] = []
    soft_skills: List[str] = []
    projects: List[str] = []
    internships: List[str] = []
    organizations: List[str] = []
    certifications: List[str] = []


def generate_ats_cv(profile, recommendations, skill_gap):
    top_role = (
        recommendations[0]["job_role"]
        if recommendations else "Target Role"
    )

    ats_cv = {
        "header": {
            "name": profile.get("name", ""),
            "target_role": top_role,
            "location": profile.get("location", ""),
            "email": profile.get("email", ""),
            "phone": profile.get("phone", ""),
            "linkedin": profile.get("linkedin", "")
        },

        "professional_summary": (
            f"{profile.get('major', '')} student with experience in "
            f"{', '.join(profile.get('hard_skills', [])[:3])}. "
            f"Passionate about developing professional skills and pursuing a career as {top_role}."
        ),

        "education": {
            "university": profile.get("university", ""),
            "degree": profile.get("education", ""),
            "major": profile.get("major", ""),
            "semester": profile.get("semester", ""),
            "gpa": profile.get("gpa", "")
        },

        "skills": {
            "tech_skill": profile.get("hard_skills", []),
            "soft_skill": profile.get("soft_skills", [])
        },

        "projects": profile.get("projects", []),
        "internship_experience": profile.get("internships", []),
        "organizational_experience": profile.get("organizations", []),
        "certifications": profile.get("certifications", []),
        "ats_keywords_to_add": skill_gap.get("missing_skills", [])
    }

    return ats_cv


def generate_genai_explanation(profile, recommendations, skill_gap, ats_cv):
    try:
        from groq import Groq

        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY belum terbaca di server.")

        client = Groq(api_key=api_key)

        prompt = (
            "Kamu adalah career advisor untuk mahasiswa Indonesia. "
            "Buat penjelasan rekomendasi karier dalam Bahasa Indonesia. "
            "Gunakan bahasa singkat, jelas, natural, dan actionable. "
            "Jangan gunakan format Markdown. Jangan gunakan tanda **, #, -, atau bullet simbol. "
            "Gunakan teks biasa dengan paragraf rapi dan penomoran biasa 1), 2), 3). "
            "Jangan mengarang pengalaman baru di luar data user. "
            "Jelaskan rekomendasi utama, top-3 career recommendation, "
            "alasan kecocokan, hard skill gap, soft skill gap, learning path singkat, "
            "dan saran ATS CV.\n\n"
            f"USER_PROFILE:\n{json.dumps(profile, indent=2, ensure_ascii=False)}\n\n"
            f"RECOMMENDATIONS:\n{json.dumps(recommendations, indent=2, ensure_ascii=False)}\n\n"
            f"SKILL_GAP:\n{json.dumps(skill_gap, indent=2, ensure_ascii=False)}\n\n"
            f"ATS_CV:\n{json.dumps(ats_cv, indent=2, ensure_ascii=False)}"
        )

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "Kamu adalah career advisor profesional untuk mahasiswa Indonesia."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            max_tokens=700
        )

        return response.choices[0].message.content

    except Exception as e:
        print("GROQ ERROR:", repr(e))

        if not recommendations:
            return "Belum ada rekomendasi karier."

        top = recommendations[0]

        hard_matched = skill_gap.get("hard_skill_gap", {}).get("matched", [])
        hard_missing = skill_gap.get("hard_skill_gap", {}).get("missing", [])
        soft_matched = skill_gap.get("soft_skill_gap", {}).get("matched", [])
        soft_missing = skill_gap.get("soft_skill_gap", {}).get("missing", [])

        return (
            f"Berdasarkan hasil analisis StepUp, rekomendasi karier utama adalah "
            f"{top['job_role']} dengan tingkat kecocokan {top['match_score']}%. "
            f"Profil pengguna sudah memiliki hard skill yang relevan seperti "
            f"{', '.join(hard_matched) if hard_matched else '-'}. "
            f"Hard skill yang perlu ditingkatkan yaitu "
            f"{', '.join(hard_missing) if hard_missing else 'tidak ada yang terlalu kurang'}. "
            f"Soft skill yang sudah sesuai adalah "
            f"{', '.join(soft_matched) if soft_matched else '-'}. "
            f"Soft skill yang perlu dikembangkan yaitu "
            f"{', '.join(soft_missing) if soft_missing else 'tidak ada yang terlalu kurang'}. "
            f"Learning path yang disarankan adalah memperkuat skill yang masih kurang, "
            f"mengerjakan proyek yang relevan dengan {top['job_role']}, dan menambahkan keyword penting "
            f"pada ATS CV agar lebih sesuai dengan kebutuhan rekrutmen."
        )

@app.get("/")
def root():
    return {
        "message": "StepUp AI API is running"
    }


@app.post("/predict")
def predict(profile: UserProfile):
    profile_dict = profile.dict()

    result = predict_final_recommendation(profile_dict)

    recommendations = result["top_3_recommendations"]
    skill_gap = result["skill_gap"]

    ats_cv = generate_ats_cv(
        profile_dict,
        recommendations,
        skill_gap
    )

    genai_explanation = generate_genai_explanation(
        profile_dict,
        recommendations,
        skill_gap,
        ats_cv
    )

    return {
        "top_3_recommendations": recommendations,
        "skill_gap": skill_gap,
        "ats_cv": ats_cv,
        "genai_explanation": genai_explanation
    }