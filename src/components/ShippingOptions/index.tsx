import React, { useState } from "react";
import { FaTag } from "react-icons/fa";
import { formatCurrency } from "../../utils/utils";
import { useCart } from "../../context/CartContext";
import { ShippingOptionsProps } from "./types";
import "./styles.scss";

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  shippingMethods,
}) => {
  const { updateCart, cartState } = useCart();

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    cartState.id_shipping
  );

  const handleOptionClick = async (methodId: string) => {
    setSelectedOption(methodId);
    updateCart({
      ...cartState.products[0],
      id_shipping: methodId,
    });
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Gratis" : `${formatCurrency(price)}`;
  };

  return (
    <div className="shipping-options">
      <h3>Opciones de Envío</h3>
      {shippingMethods.map((method) => (
        <li
          key={method._id}
          className={`shipping-option ${
            selectedOption === method._id ? "selected" : ""
          }`}
          onClick={() => handleOptionClick(method._id)}
        >
          <div className="shipping-details">
            <h4 className="shipping-title">{method.type}</h4>
            <p className="shipping-description">{method.description}</p>
            <span className="shipping-price">
              <FaTag /> {formatPrice(method.price)}
            </span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ShippingOptions;
