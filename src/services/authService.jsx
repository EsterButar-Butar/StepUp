import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

export const loginUser = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "dummy-token",
        user: {
          email,
        },
      });
    }, 1500);
  });
};
