import api from "../services/api";
import { normalizeRecommendationResult } from "./resultApi";

export const getCareerDetail = async (careerId) => {

    const response = await api.get(
        `/recommendation/${careerId}`
    );

    return normalizeRecommendationResult(response.data, careerId);
};
