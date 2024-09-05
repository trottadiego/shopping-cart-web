import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { FaHandsHelping } from "react-icons/fa";
import { PageHeaderProps } from "./types";
// import logo from "../../../public/mllogo.webp";

const PageHeader: React.FC<PageHeaderProps> = ({ path, icon }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(`${path}`);
  };

  return (
    <div>
      <header className="page-header">
        <div className="brand-header">
          <div className="brand-logo">
            <FaHandsHelping size={"2rem"} color="white" />
            {/* <img src={logo} sizes="20px" /> */}
          </div>
          <h1>Mercado Libre</h1>
        </div>
        <button className="icon-button" onClick={handleIconClick}>
          {icon}
        </button>
      </header>
    </div>
  );
};

export default PageHeader;
