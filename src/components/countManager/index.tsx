import React from "react";
import "./styles.scss";
import { CountManagerProps } from "./types";

const CountManager: React.FC<CountManagerProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min,
  max,
}) => {
  return (
    <div className="count-manager">
      <button
        className="count-manager__decrease"
        onClick={onDecrease}
        disabled={quantity === min}
      >
        -
      </button>
      <span className="count-manager__quantity">{quantity}</span>
      <button
        className="count-manager__increase"
        onClick={onIncrease}
        disabled={quantity === max}
      >
        +
      </button>
    </div>
  );
};

export default CountManager;
