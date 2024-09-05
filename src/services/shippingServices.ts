import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchShippings = async () => {
  try {
    const response = await axios.get(`${API_URL}/shipping`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
