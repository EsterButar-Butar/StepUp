import { getProfileData } from "../api/profileApi";
import {
  mergeUserWithPersistedProfileImage,
  persistProfileImage,
} from "../utils/profileImage";

export const fetchProfileData = async () => {
  const response = await getProfileData();
  const payload = response?.data || response || {};

  console.log("Profile API payload:", payload);

  const user = mergeUserWithPersistedProfileImage(
    payload?.user || payload?.profile || {},
  );

  if (user?.profileImage || user?.profilePicture || user?.avatarUrl) {
    persistProfileImage(
      user.profileImage || user.profilePicture || user.avatarUrl,
      user,
    );
  }

  return {
    user,
    assessmentSummary:
      payload?.assessmentSummary || payload?.summary || payload?.stats || {},
    progress: payload?.progress || {},
    recentActivities: payload?.recentActivities || payload?.activities || [],
  };
};
