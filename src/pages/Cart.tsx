import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styles/cart.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList";

const CartPage: React.FC = () => {
  const { cartState, getCart, saveCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice = cartState.products.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );
  const handleBackClick = async () => {
    await saveCart();
    navigate("/dashboard");
  };

  return (
    <div>
      <header className="cart-header">
        <h1>Mercado Libre</h1>
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft size={24} />
        </button>
      </header>
      <div className="cart-page">
        <CartList products={cartState.products} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
