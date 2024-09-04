import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductList from "../components/ProductList";
import PageHeader from "../components/PageHeader";

import "../styles/dashboard.scss";

const Dashboard: React.FC = () => {
  const { products, fetchProducts } = useProducts();
  const { getCart, getTotalQuantity } = useCart();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    fetchProducts();
    getCart();
  }, []);

  useEffect(() => {
    setTotalQuantity(getTotalQuantity());
  }, [getTotalQuantity]);

  return (
    <div>
      <PageHeader
        icon={
          <div className="cart-icon-container">
            <FaShoppingCart size={24} />
            {totalQuantity > 0 && (
              <span className="cart-quantity">{totalQuantity}</span>
            )}
          </div>
        }
        path={"/cart"}
      />

      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
