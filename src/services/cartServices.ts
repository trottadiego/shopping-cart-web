import axios from "axios";
import { ProductInCart } from "../types/CartTypes";

const API_URL = "http://localhost:3000/api";

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

export const updateCartService = async (
  token: string,
  productInCart?: ProductInCart,
  shippingId?: string
) => {
  return axios.put(
    `${API_URL}/cart/update`,
    { ...productInCart, shippingId },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );
};

export const removeFromCartService = async (
  token: string,
  productId: string
) => {
  return axios.delete(`${API_URL}/cart/remove`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    data: {
      product_id: productId,
    },
  });
};
