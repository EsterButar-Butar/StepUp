import api from "../services/api";

export const getProfileData = async () => {
  const response = await api.get("/profile");

  return response.data;
};