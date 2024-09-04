import React from "react";
import "./styles.scss";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/utils";
import { ProductCardProps } from "./types";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartState } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const isInCart = cartState.products.some(
    (item) => item.product_id._id === product._id
  );

  return (
    <div className="product-card">
      <div className="image-section">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="info-section">
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price)}</p>
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={isInCart ? "in-cart" : ""}
        >
          {isInCart ? "En el carrito" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
