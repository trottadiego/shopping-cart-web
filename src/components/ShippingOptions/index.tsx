import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import { formatCurrency } from "../../utils/utils";
import { useCart } from "../../context/CartContext";

interface ShippingMethod {
  _id: string;
  type: string;
  price: number;
}

const ShippingOptions: React.FC = () => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");
  const { updateCart, cartState } = useCart();

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/shipping");
        setShippingMethods(response.data);
        setSelectedOption(cartState.id_shipping);
        console.log(cartState);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };

    fetchShippingMethods();
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
    return price === 0 ? "Gratis" : `$${formatCurrency(price)}`;
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
            {method.type} - {formatPrice(method.price)}
          </label>
        </div>
      ))}
    </li>
  );
};

export default ShippingOptions;
