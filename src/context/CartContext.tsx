import React, { createContext, useContext, useCallback } from "react";
import {
  fetchCartData,
  addToCartService,
  updateCartService,
  removeFromCartService,
} from "../services/cartServices";
import { CartContextProps, CartState, ProductInCart } from "../types/CartTypes";
import { Product } from "../types/ProductTypes";
import { useNavigate } from "react-router-dom";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, setCartState] = React.useState<CartState>({
    products: [],
  });

  const navigate = useNavigate();

  const getCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetchCartData(token);

      if (response.data) {
        const { products, id_shipping } = response.data;
        setCartState({ products, id_shipping });
      } else {
        setCartState({
          products: [],
        });
      }
    } catch (error: any) {
      console.error("Error al obtener el carrito", error.message);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, []);

  const addToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await addToCartService(token, product._id);

      if (response.status === 200) {
        const { products, id_shipping } = response.data;

        setCartState({ products, id_shipping });
      }
    } catch (error) {
      console.error("Error al agregar al carrito", error);
    }
  };

  const updateCart = async (
    productInCart: ProductInCart,
    id_shipping?: string
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await updateCartService(
        token,
        productInCart,
        id_shipping
      );
      if (response.status === 200) {
        const { products, id_shipping } = response.data;

        setCartState({ products, id_shipping });
      }
    } catch (error) {
      console.error("Error al actualizar el carrito", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await removeFromCartService(token, productId);
      if (response.status === 200) {
        let { products, id_shipping } = response.data;
        if (!products) products = [];
        setCartState({ products, id_shipping });
      }
    } catch (error) {
      console.error("Error al eliminar del carrito", error);
    }
  };

  const getTotalQuantity = useCallback(() => {
    return cartState.products.reduce((total, item) => total + item.quantity, 0);
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        updateCart,
        removeFromCart,
        getCart,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
