import {
  loginUser,
  registerUser,
} from "../api/authApi";
import {
  clearAuth,
  normalizeAuthPayload,
  persistAuth,
} from "../utils/authStorage";

export const login = async (userData) => {
  try {
    const response = await loginUser(userData);
    const data = response?.data || response;
    const { token, user, body } = normalizeAuthPayload(data);

    if (!token) {
      throw new Error("Invalid login response");
    }

    persistAuth({ token, user });

    return body;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed";

    throw new Error(message, { cause: error });
  }
};

export const register = async (userData) => {
  try {

    const data = await registerUser(userData);

    return data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Register failed";

    throw new Error(message, { cause: error });
  }
};

export const logout = () => {
  clearAuth();
};
