import React, { createContext, useState, useContext } from "react";
import { fetchProducts as fetchProductsService } from "../services/productServices";
import { Product, ProductContextType } from "../types/ProductTypes";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData = await fetchProductsService();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
