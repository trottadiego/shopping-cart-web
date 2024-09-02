import React from "react";
import "./styles.scss";

interface CountManagerProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CountManager: React.FC<CountManagerProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="count-manager">
      <button
        className="count-manager__decrease"
        onClick={onDecrease}
        disabled={quantity === 1}
      >
        -
      </button>
      <span className="count-manager__quantity">{quantity}</span>
      <button className="count-manager__increase" onClick={onIncrease}>
        +
      </button>
    </div>
  );
};

export default CountManager;
