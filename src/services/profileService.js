import { getProfileData } from "../api/profileApi";

export const fetchProfileData = async () => {
    return await getProfileData();
};