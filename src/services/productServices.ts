import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProductStocks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log(token);
    const response = await axios.put(
      `${API_URL}/products/update-stocks`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product stocks:", error);
    throw error;
  }
};
