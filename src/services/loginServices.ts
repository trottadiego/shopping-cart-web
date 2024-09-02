import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (user: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      user,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
