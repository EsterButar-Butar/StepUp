const STORAGE_KEYS = {
    step1: "assessmentStep1",
    profileImage: "assessmentProfileImage",
    step2: "assessmentStep2",
    step2Category: "assessment2-category",
    step2Tech: "assessment2-tech",
    step2Soft: "assessment2-soft",
    step2Level: "assessment2-level",
    projects: "assessment3-projects",
    internships: "assessment3-internships",
    organizations: "assessment3-organizations",
    certifications: "assessment3-certifications",
};

const parseJson = (value) => {
    if (value === null || value === undefined) return null;

    try {
        return JSON.parse(value);
    } catch (error) {
        console.error("Failed to parse draft JSON", error);
        return null;
    }
};

export const getStoredDraft = () => {
    if (typeof window === "undefined") return {};

    return {
        step1: parseJson(localStorage.getItem(STORAGE_KEYS.step1)),
        profileImage: localStorage.getItem(STORAGE_KEYS.profileImage),
        step2: parseJson(localStorage.getItem(STORAGE_KEYS.step2)),
        category: localStorage.getItem(STORAGE_KEYS.step2Category),
        technicalSkills: parseJson(localStorage.getItem(STORAGE_KEYS.step2Tech)),
        softSkills: parseJson(localStorage.getItem(STORAGE_KEYS.step2Soft)),
        level: localStorage.getItem(STORAGE_KEYS.step2Level),
        projects: parseJson(localStorage.getItem(STORAGE_KEYS.projects)),
        internships: parseJson(localStorage.getItem(STORAGE_KEYS.internships)),
        organizations: parseJson(localStorage.getItem(STORAGE_KEYS.organizations)),
        certifications: parseJson(localStorage.getItem(STORAGE_KEYS.certifications)),
    };
};

const setItem = (key, value) => {
    if (typeof window === "undefined") return;

    if (value === undefined || value === null) return;

    if (typeof value === "string") {
        localStorage.setItem(key, value);
        return;
    }

    localStorage.setItem(key, JSON.stringify(value));
};

export const saveDraft = (draft = {}) => {
    try {
        setItem(STORAGE_KEYS.step1, draft.step1);
        setItem(STORAGE_KEYS.profileImage, draft.profileImage);
        setItem(STORAGE_KEYS.step2, draft.step2);
        setItem(STORAGE_KEYS.step2Category, draft.category);
        setItem(STORAGE_KEYS.step2Tech, draft.technicalSkills);
        setItem(STORAGE_KEYS.step2Soft, draft.softSkills);
        setItem(STORAGE_KEYS.step2Level, draft.level);
        setItem(STORAGE_KEYS.projects, draft.projects);
        setItem(STORAGE_KEYS.internships, draft.internships);
        setItem(STORAGE_KEYS.organizations, draft.organizations);
        setItem(STORAGE_KEYS.certifications, draft.certifications);
    } catch (error) {
        console.error("Failed to save draft", error);
        throw new Error("Failed to save draft");
    }
};
