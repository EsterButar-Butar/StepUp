import api from "../services/api";

export async function checkAnalysisStatus() {
  const response = await api.get("/analysis/status");

  return response.data;
}