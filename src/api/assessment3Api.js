import api from "../services/api";

export async function submitAssessment3(data) {
    const response = await api.post("/assessment/step3", data);

    return response.data;
}