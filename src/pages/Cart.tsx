import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaArrowLeft } from "react-icons/fa";
import CartList from "../components/CartList";
import PageHeader from "../components/PageHeader";
import "../styles/cart.scss";

const CartPage: React.FC = () => {
  const { getCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <PageHeader icon={<FaArrowLeft size={24} />} path={"/dashboard"} />
      <div className="cart-page">
        <CartList />
      </div>
    </div>
  );
};

export default CartPage;
