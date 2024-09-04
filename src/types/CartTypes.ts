import { Product } from "./ProductTypes";

export interface ProductInCart {
  _id: string;
  product_id: Product;
  quantity: number;
  id_shipping: string;
}
export interface CartState {
  products: ProductInCart[];
  id_shipping?: string;
}

export interface CartContextProps {
  cartState: CartState;
  addToCart: (product: Product) => void;
  updateCart: (productInCart: ProductInCart, id_shipping?: string) => void;
  removeFromCart: (productId: string) => void;
  getTotalQuantity: () => number;
  getCart: () => void;
}
