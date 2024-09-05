import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { fetchProducts as fetchProductsService } from "../services/productServices";
import { useCart } from "../context/CartContext";
import ProductList from "../components/ProductList";
import PageHeader from "../components/PageHeader";
import { Product } from "../types/ProductTypes";

import "../styles/dashboard.scss";

const Dashboard: React.FC = () => {
  const { getCart, getTotalQuantity } = useCart();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData = await fetchProductsService();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
