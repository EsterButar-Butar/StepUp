import api from "../services/api";

export const getCareerDetail = async (careerId) => {
    const response = await api.get(`/careers/${careerId}`);

    return response.data;
};