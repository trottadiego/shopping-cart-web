export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

export interface ProductContextType {
  products: Product[];
  fetchProducts: () => void;
}
