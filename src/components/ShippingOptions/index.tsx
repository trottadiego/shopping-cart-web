import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setSelectedOption(cartState.id_shipping);
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMethodId = event.target.value;
    setSelectedOption(selectedMethodId);
    await updateCart({
      ...cartState.products[0],
      id_shipping: selectedMethodId,
    });
  };

  const formatPrice = (price: number) => {
    return price === 0 ? "Gratis" : `${formatCurrency(price)}`;
  };

  return (
    <li className="shipping-options">
      <h3>Opciones de Envío</h3>
      {shippingMethods.map((method) => (
        <div key={method._id}>
          <label className="shipping-option">
            <input
              type="radio"
              name="shippingOption"
              value={method._id}
              checked={selectedOption === method._id}
              onChange={handleChange}
            />
            {method.type} {formatPrice(method.price)}
          </label>
        </div>
      ))}
    </li>
  );
};

export default ShippingOptions;
