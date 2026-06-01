import axios from "axios";
import { getAuthToken } from "../utils/authStorage";

const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const api = axios.create({
    baseURL: API_BASE_URL.endsWith("/api")
        ? API_BASE_URL
        : `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
