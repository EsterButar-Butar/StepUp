import api from "../services/api";

export async function submitAssessment2(data) {
    const response = await api.post("/assessment/step2", data);

    return response.data;
}