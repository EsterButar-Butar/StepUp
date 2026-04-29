
from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
import joblib
import pandas as pd
import re
import ast

app = FastAPI(title="Career Recommendation AI API")

class ResumeRequest(BaseModel):
    resume_text: str
    top_k: int = 5

def normalize_text(text):
    if text is None:
        return ""
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9+#.\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

model = tf.keras.models.load_model("saved_model/career_model.keras")
vectorizer = joblib.load("saved_model/tfidf_vectorizer.pkl")
encoder = joblib.load("saved_model/label_encoder.pkl")
job_reference = pd.read_pickle("saved_model/job_reference.pkl")

all_skills = set()
for skills in job_reference["skills"]:
    all_skills.update(skills)
for skills in job_reference["required_skills"]:
    all_skills.update(skills)

SKILL_DB = sorted(list(all_skills))

def extract_skills_from_text(text):
    text = normalize_text(text)
    found_skills = []
    for skill in SKILL_DB:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, text):
            found_skills.append(skill)
    return sorted(list(set(found_skills)))

def calculate_skill_match_score(user_skills, required_skills):
    user_skills = set(user_skills)
    required_skills = set(required_skills)
    if len(required_skills) == 0:
        return 0.0
    matched = user_skills.intersection(required_skills)
    return round((len(matched) / len(required_skills)) * 100, 2)

def recommend_jobs(user_skills, top_k=5):
    results = []
    for _, row in job_reference.iterrows():
        required = row["required_skills"]
        matched = sorted(list(set(user_skills) & set(required)))
        missing = sorted(list(set(required) - set(user_skills)))
        score = calculate_skill_match_score(user_skills, required)

        results.append({
            "job_role": row["job_role"],
            "category": row.get("category", ""),
            "match_percentage": score,
            "matched_skills": matched,
            "missing_skills": missing
        })

    result_df = pd.DataFrame(results)
    result_df = result_df.sort_values("match_percentage", ascending=False)
    result_df = result_df.drop_duplicates(subset=["job_role"], keep="first")
    return result_df.head(top_k).to_dict(orient="records")

def predict_ai(resume_text, top_k=5):
    clean_text = normalize_text(resume_text)
    X_input = vectorizer.transform([clean_text]).toarray()
    pred = model.predict(X_input, verbose=0)[0]

    top_indices = pred.argsort()[-top_k:][::-1]

    results = []
    for idx in top_indices:
        results.append({
            "job_role": encoder.inverse_transform([idx])[0],
            "model_confidence": round(float(pred[idx]) * 100, 2)
        })
    return results

@app.get("/")
def home():
    return {"message": "Career Recommendation AI API is running"}

@app.post("/recommend-career")
def recommend_career(request: ResumeRequest):
    user_skills = extract_skills_from_text(request.resume_text)
    rule_recommendations = recommend_jobs(user_skills, request.top_k)
    ai_predictions = predict_ai(request.resume_text, request.top_k)

    return {
        "extracted_skills": user_skills,
        "career_recommendations": rule_recommendations,
        "ai_predictions": ai_predictions
    }
