import React from "react";
import CartItem from "../CartItem/index";
import { useCart } from "../../context/CartContext";
import EmptyState from "../EmptyState/index";
import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "../../utils/utils";
import ShippingOptions from "../ShippingOptions";

import "./styles.scss";

const CartList: React.FC = () => {
  const { cartState } = useCart();

  const totalPrice = cartState.products.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  return (
    <div className="cart-list">
      <h1>Carrito de Compras</h1>
      {cartState.products.length === 0 ? (
        <EmptyState
          title={"¡Tu carrito está vacío!"}
          text={
            "Explora nuestra tienda y agrega tus productos favoritos. ¡Haz clic y comienza a llenar tu carrito ahora!"
          }
          labelButton={"Agregar productos"}
          icon={<FaCartPlus size={"6.25rem"} color={"#ffe600"} />}
        />
      ) : (
        <div>
          <ul>
            {cartState.products.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            <ShippingOptions />
          </ul>
          <div className="total">
            <h2>Total: {formatCurrency(totalPrice)}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
