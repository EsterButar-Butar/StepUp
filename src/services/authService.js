import {
  loginUser,
  registerUser,
} from "../api/authApi";

export const login = async (userData) => {
  try {
    const response = await loginUser(userData);
    const data = response?.data || response;

    if (!data?.token || !data?.user) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    window.dispatchEvent(new Event("auth:changed"));

    return data;

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
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.dispatchEvent(new Event("auth:changed"));
};
