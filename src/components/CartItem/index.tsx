import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import CountManager from "../countManager";
import { formatCurrency } from "../../utils/utils";
import { CartItemProps } from "./types";
import "./styles.scss";

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCart } = useCart();

  const handleIncrease = () => {
    if (item.product_id.stock > item.quantity) {
      updateCart({ ...item, quantity: item.quantity + 1 });
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <li className="cart-item">
      <img src={item.product_id.image} alt={item.product_id.name} />
      <div className="cart-item-info">
        <h3>{item.product_id.name}</h3>
        <p>Precio: {formatCurrency(item.product_id.price)}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Subtotal: {formatCurrency(item.product_id.price * item.quantity)}</p>
      </div>
      <div>
        <div className="cart-item-actions">
          <CountManager
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
            max={item.product_id.stock}
          />
          <button
            className="remove-button"
            onClick={() => removeFromCart(item.product_id._id)}
          >
            <FaTrash size={23} />
          </button>
        </div>
        <p className="stock">{item.product_id.stock} disponibles</p>
      </div>
    </li>
  );
};

export default CartItem;
