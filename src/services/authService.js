import {
  loginUser,
  registerUser,
} from "../api/authApi";

export const login = async (userData) => {
  const data = await loginUser(userData);

  localStorage.setItem("token", data.token);

  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const register = async (userData) => {
  return await registerUser(userData);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};