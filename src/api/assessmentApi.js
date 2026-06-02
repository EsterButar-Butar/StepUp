import api from "../services/api";

export const submitAssessment = async (data) => {

    const response = await api.post(
        "/assessment",
        data
    );

    return response.data;
};