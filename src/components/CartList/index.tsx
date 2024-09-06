import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/index";
import { useCart } from "../../context/CartContext";
import EmptyState from "../EmptyState/index";
import { fetchShippings } from "../../services/shippingServices";
import { FaArrowLeft, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { formatCurrency } from "../../utils/utils";
import ShippingOptions from "../ShippingOptions";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { updateProductStocks } from "../../services/productServices";

const CartList: React.FC = () => {
  const { cartState, getTotalQuantity, getCart } = useCart();
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [isCheckout, setIsCheckout] = useState<Boolean>(false);

  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/dashboard");
  };

  const fetchMethods = async () => {
    try {
      const response = await fetchShippings();
      setShippingMethods(response);
    } catch (error) {
      console.error("Error fetching shipping methods:", error);
    }
  };

  useEffect(() => {
    getCart();
    fetchMethods();
  }, [isCheckout]);

  const handleCheckout = async () => {
    try {
      await updateProductStocks();
      setIsCheckout(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
      <div className="header">
        <button className="icon-button" onClick={handleIconClick}>
          <FaArrowLeft size={24} />
        </button>
        <h1>Carrito de Compras</h1>
      </div>
      {cartState.products.length === 0 ? (
        <EmptyState
          title={
            !isCheckout
              ? "¡Tu carrito está vacío!"
              : "¡Compra realizada con éxito!"
          }
          text={
            !isCheckout
              ? "Explora nuestra tienda y agrega tus productos favoritos. ¡Haz clic y comienza a llenar tu carrito ahora!"
              : "Gracias por tu compra. Hemos recibido tu pedido y te enviaremos una confirmación a tu correo electrónico pronto. ¡Esperamos que disfrutes de tus productos!"
          }
          labelButton={!isCheckout ? "Agregar productos" : "Seguir comprando"}
          icon={
            !isCheckout ? (
              <FaCartPlus size={"6.25rem"} color={"#ffe600"} />
            ) : (
              <FaCheckCircle size={"6.25rem"} color={"#ffc107"} />
            )
          }
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
          <button className="continue-button" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CartList;
