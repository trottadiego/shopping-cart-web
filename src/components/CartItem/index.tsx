import React from "react";
import "./styles.scss";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import CountManager from "../countManager";

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

interface CartItemProps {
  item: ProductInCart;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCartItem } = useCart();

  const handleIncrease = () => {
    updateCartItem({ ...item, quantity: item.quantity + 1 });
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCartItem({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <li className="cart-item">
      <img src={item.product_id.image} alt={item.product_id.name} />
      <div className="cart-item-info">
        <h3>{item.product_id.name}</h3>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio: ${item.product_id.price}</p>
        <p>Total: ${(item.product_id.price * item.quantity).toFixed(2)}</p>
        <CountManager
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        <button
          className="remove-button"
          onClick={() => removeFromCart(item._id)}
        >
          <FaTrash size={16} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
