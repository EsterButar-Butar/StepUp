import api from "../services/api";

export async function submitAssessment(data) {
    const response = await api.post("/assessment", data);

    return response.data;
}