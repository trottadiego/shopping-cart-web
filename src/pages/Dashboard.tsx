import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.scss";

const Dashboard: React.FC = () => {
  const { products, fetchProducts } = useProducts();
  const { getCart, getTotalQuantity, saveCart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    getCart();
  }, []);

  useEffect(() => {
    setTotalQuantity(getTotalQuantity());
  }, [getTotalQuantity]);

  const onHandleClick = async () => {
    await saveCart();
    navigate("/cart");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Mercado Libre</h1>
        <button className="cart-button" onClick={onHandleClick}>
          <FaShoppingCart size={24} />
          {totalQuantity > 0 && (
            <span className="cart-quantity">{totalQuantity}</span>
          )}
        </button>
      </header>
      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
