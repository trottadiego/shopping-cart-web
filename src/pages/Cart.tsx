import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

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
      <PageHeader />
      <div className="cart-page">
        <CartList />
      </div>
    </div>
  );
};

export default CartPage;
