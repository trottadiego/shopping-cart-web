import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { EmptyStateProps } from "./types";

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  text,
  labelButton,
  icon,
}) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/dashboard");
  };

  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {icon}
      <p>{text}</p>
      <button onClick={handleShopNow} className="shop-now-button">
        {labelButton}
      </button>
    </div>
  );
};

export default EmptyState;
