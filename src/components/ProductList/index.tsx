import React from "react";
import ProductCard from "../ProductCard/index";
import "./styles.scss";
// import { useCart } from "../../context/CartContext";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // const { addToCart } = useCart();

  // const handleAddToCart = (product: Product) => {
  //   addToCart(product);
  // };

  return (
    <div className="product-list">
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
