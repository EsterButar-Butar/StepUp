import api from "../services/api";

export const getAssessmentResult = async () => {
    const response = await api.get("/results");

    return response.data;
};