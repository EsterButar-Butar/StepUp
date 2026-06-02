import { getSkills } from "../api/skillApi";

export const fetchSkills = async () => {
    try {

        const data = await getSkills();

        return data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Failed to fetch skills"
        );
    }
};