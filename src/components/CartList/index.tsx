import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/index";
import { useCart } from "../../context/CartContext";
import EmptyState from "../EmptyState/index";
import { fetchShippings } from "../../services/shippingServices";

import { FaCartPlus } from "react-icons/fa";
import { formatCurrency } from "../../utils/utils";
import ShippingOptions from "../ShippingOptions";

import "./styles.scss";

const CartList: React.FC = () => {
  const { cartState, getTotalQuantity } = useCart();
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);

  const fetchMethods = async () => {
    try {
      const response = await fetchShippings();
      setShippingMethods(response);
    } catch (error) {
      console.error("Error fetching shipping methods:", error);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const subtotalPrice = cartState.products.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  const totalPrice = () => {
    const shipping = shippingMethods.find(
      (sm) => sm._id.toString() === cartState.id_shipping
    );

    const total = shipping ? shipping.price + subtotalPrice : subtotalPrice;
    return total;
  };

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
            <div className="cart-item">
              <ShippingOptions shippingMethods={shippingMethods} />
            </div>
          </ul>
          <div className="summary">
            {totalPrice() !== subtotalPrice && (
              <p className="subtotal">
                Subtotal: {formatCurrency(subtotalPrice)}
              </p>
            )}
            <p className="subtotal">Productos: {getTotalQuantity()}</p>
          </div>
          <h2 className="total">Total: {formatCurrency(totalPrice())}</h2>
        </div>
      )}
    </div>
  );
};

export default CartList;
