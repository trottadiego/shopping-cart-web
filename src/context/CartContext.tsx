import React, { createContext, useContext, useCallback } from "react";
import {
  fetchCartData,
  addToCartService,
  updateCartService,
  removeFromCartService,
} from "../services/cartServices";
import { CartContextProps, ProductInCart } from "../types/CartTypes";
import { Product } from "../types/ProductTypes";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, setCartState] = React.useState<ProductInCart[]>([]);
  const getCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetchCartData(token);
      if (response.data) {
        setCartState(response.data.products);
      } else {
        setCartState([]);
      }
    } catch (error: any) {
      console.error("Error al obtener el carrito", error.message);
    }
  }, []);

  const addToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await addToCartService(token, product._id);

      if (response.status === 200) {
        setCartState(response.data.products);
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
        setCartState(response.data.products);
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
        setCartState(response.data.products);
      }
    } catch (error) {
      console.error("Error al eliminar del carrito", error);
    }
  };

  const getTotalQuantity = useCallback(() => {
    return cartState.reduce((total, item) => total + item.quantity, 0);
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
