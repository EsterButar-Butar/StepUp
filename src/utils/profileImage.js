import {
  AUTH_CHANGED_EVENT,
  getStoredUser,
  setStoredUser,
} from "./authStorage";

const PROFILE_IMAGE_STORAGE_KEY = "stepupProfileImage";
const PROFILE_IMAGE_OWNER_KEY = "stepupProfileImageOwner";

const isBrowser = () => typeof window !== "undefined";

const getUserIdentity = (user = {}) =>
  user?.email ||
  user?._id ||
  user?.id ||
  user?.uid ||
  user?.name ||
  user?.fullName ||
  "";

const getStoredProfileImage = (user = {}) => {
  if (!isBrowser()) return null;

  const image = localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);

  if (!image) return null;

  const owner = localStorage.getItem(PROFILE_IMAGE_OWNER_KEY);
  const identity = getUserIdentity(user);

  if (owner && identity && owner !== identity) return null;

  return image;
};

export const getProfileImageFromUser = (user = {}) =>
  user?.profilePicture ||
  user?.profileImage ||
  user?.avatarUrl ||
  user?.avatar ||
  getStoredProfileImage(user) ||
  getStoredProfileImage(getStoredUser());

export const getProfileImageWithFallback = (
  user = {},
  fallbackSeed = "Guest",
) => {
  const image = getProfileImageFromUser(user);

  if (image) return image;

  const seed =
    fallbackSeed ||
    user?.name ||
    user?.fullName ||
    user?.email ||
    "Guest";

  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
    seed,
  )}`;
};

export const persistProfileImage = (image, user = {}) => {
  if (!isBrowser() || !image) return;

  localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, image);

  const identity = getUserIdentity(user);

  if (identity) {
    localStorage.setItem(PROFILE_IMAGE_OWNER_KEY, identity);
  }

  const storedUser = getStoredUser() || {};
  const nextUser = {
    ...storedUser,
    ...user,
    profileImage: image,
    profilePicture: image,
    avatarUrl: image,
  };

  setStoredUser(nextUser);
  window.dispatchEvent(new Event("profile:image-changed"));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const clearPersistedProfileImage = () => {
  if (!isBrowser()) return;

  localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
  localStorage.removeItem(PROFILE_IMAGE_OWNER_KEY);
  localStorage.removeItem("assessmentProfileImage");

  const storedUser = getStoredUser() || {};

  if (Object.keys(storedUser).length) {
    const { profileImage, profilePicture, avatarUrl, avatar, ...rest } =
      storedUser;

    setStoredUser(rest);
  }

  window.dispatchEvent(new Event("profile:image-changed"));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const mergeUserWithPersistedProfileImage = (user = {}) => {
  const image = getProfileImageFromUser(user);

  if (!image) return user || {};

  return {
    ...user,
    profileImage: user?.profileImage || image,
    profilePicture: user?.profilePicture || image,
    avatarUrl: user?.avatarUrl || image,
  };
};
