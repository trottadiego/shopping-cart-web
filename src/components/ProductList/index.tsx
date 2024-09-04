import React from "react";
import ProductCard from "../ProductCard/index";
import "./styles.scss";
import { ProductListProps } from "./types";

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      <ul>
        {products
          .filter((product) => product.stock > 0)
          .map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
