import axios from "axios";

const API_URL = "http://localhost:3000/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductInCart {
  _id: string;
  product_id: Product;
  quantity: number;
}

export const fetchCartData = async (token: string) => {
  return axios.get(`${API_URL}/cart`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
};

export const addToCartService = async (token: string, productId: string) => {
  return axios.post(
    `${API_URL}/cart/add`,
    { product_id: productId, quantity: 1 },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const saveCartService = async (
  token: string,
  products: ProductInCart[]
) => {
  try {
    await axios.post(
      `${API_URL}/cart/save`,
      { products },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
  } catch (error) {
    console.error("Error syncing cart:", error);
    throw error;
  }
};
