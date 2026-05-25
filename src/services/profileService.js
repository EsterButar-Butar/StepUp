import { getProfileData } from "../api/profileApi";

export const fetchProfileData = async () => {
  const response = await getProfileData();
  const payload = response?.data || response || {};

  return {
    user: payload?.user || payload?.profile || {},
    assessmentSummary:
      payload?.assessmentSummary || payload?.summary || payload?.stats || {},
    progress: payload?.progress || {},
    recentActivities: payload?.recentActivities || payload?.activities || [],
  };
};
