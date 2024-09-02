import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  fetchCartData,
  // addToCartService,
  saveCartService,
} from "../services/cartServices";

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

interface CartState {
  products: ProductInCart[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: ProductInCart }
  | { type: "UPDATE_CART_ITEM"; payload: ProductInCart }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "SET_CART"; payload: ProductInCart[] };

interface CartContextProps {
  cartState: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getTotalQuantity: () => number;
  updateCartItem: (productInCart: ProductInCart) => void;
  getCart: () => void;
  saveCart: () => Promise<void>;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProductIndex = state.products.findIndex(
        (item) => item.product_id._id === action.payload.product_id._id
      );

      if (existingProductIndex > -1) {
        const updatedProducts = state.products.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { products: updatedProducts };
      } else {
        return { products: [...state.products, action.payload] };
      }
    }

    case "UPDATE_CART_ITEM": {
      const updatedProducts = state.products.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { products: updatedProducts };
    }

    case "SET_CART":
      return { products: action.payload };

    case "REMOVE_FROM_CART": {
      const updatedProducts = state.products.filter(
        (item) => item._id !== action.payload
      );
      return { products: updatedProducts };
    }

    default:
      return state;
  }
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, dispatch] = useReducer(cartReducer, { products: [] });

  const addToCart = (product: Product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { _id: product._id, product_id: product, quantity: 1 },
    });
  };

  const saveCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await saveCartService(token, cartState.products);
    } catch (error) {
      console.error("Error al guardar el carrito", error);
    }
  };

  const getCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetchCartData(token);
      if (response.status === 200) {
        dispatch({ type: "SET_CART", payload: response.data.products });
      }
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  }, []);

  const removeFromCart = (productId: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  const updateCartItem = (productInCart: ProductInCart) => {
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: productInCart,
    });
  };

  const getTotalQuantity = useCallback(() => {
    return cartState.products.reduce((total, item) => total + item.quantity, 0);
  }, [cartState.products]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        getCart,
        getTotalQuantity,
        updateCartItem,
        saveCart,
        removeFromCart,
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
