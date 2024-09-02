import React from "react";
import CartItem from "../CartItem/index";
import "./styles.scss";

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

interface CartListProps {
  products: ProductInCart[];
  totalPrice: number;
}

const CartList: React.FC<CartListProps> = ({ products, totalPrice }) => {
  return (
    <div className="cart-list">
      <h1>Carrito de Compras</h1>
      <ul>
        {products.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>
      <div className="total">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartList;
