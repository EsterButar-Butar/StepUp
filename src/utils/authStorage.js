export const AUTH_TOKEN_STORAGE_KEY = "accessToken";
export const LEGACY_TOKEN_STORAGE_KEY = "token";
export const AUTH_USER_STORAGE_KEY = "user";
export const AUTH_CHANGED_EVENT = "auth:changed";

const isBrowser = () => typeof window !== "undefined";

const isUsableStoredValue = (value) =>
  Boolean(value && value !== "null" && value !== "undefined");

export const safeParseJson = (value) => {
  if (!isUsableStoredValue(value)) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const normalizeStoredUser = (value) => {
  if (!value || typeof value !== "object") return null;

  return value.user || value.data?.user || value;
};

const getPayloadBody = (payload = {}) => {
  if (payload?.data && typeof payload.data === "object") {
    return payload.data;
  }

  return payload;
};

export const normalizeAuthPayload = (payload = {}) => {
  const body = getPayloadBody(payload);
  const token =
    body?.accessToken || body?.token || payload?.accessToken || payload?.token;
  const user = body?.user || payload?.user || null;

  return { token, user, body };
};

export const getAuthToken = () => {
  if (!isBrowser()) return null;

  const accessToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (isUsableStoredValue(accessToken)) return accessToken;

  const legacyToken = localStorage.getItem(LEGACY_TOKEN_STORAGE_KEY);

  if (isUsableStoredValue(legacyToken)) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, legacyToken);
    localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);
    return legacyToken;
  }

  return null;
};

export const getStoredUser = () => {
  if (!isBrowser()) return null;

  return normalizeStoredUser(
    safeParseJson(localStorage.getItem(AUTH_USER_STORAGE_KEY)),
  );
};

export const setStoredUser = (user) => {
  if (!isBrowser() || !user) return;

  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
};

export const getStoredAuth = () => ({
  token: getAuthToken(),
  user: getStoredUser(),
});

export const isAuthenticated = () => Boolean(getAuthToken());

export const persistAuth = ({ token, user }) => {
  if (!isBrowser()) return;

  if (isUsableStoredValue(token)) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);

  if (user) {
    setStoredUser(user);
  }

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const clearAuth = () => {
  if (!isBrowser()) return;

  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(LEGACY_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};
