import api from "../services/api";

export const getCVResult = async () => {
    const response = await api.get("/cv-result");

    return response.data;

};
