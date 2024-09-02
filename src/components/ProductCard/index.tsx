import React from "react";
import "./styles.scss";
import { useCart } from "../../context/CartContext";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="image-section">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="info-section">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
