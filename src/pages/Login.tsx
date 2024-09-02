import React from "react";
import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { login } from "../services/loginServices";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (user: string, password: string) => {
    try {
      const data = await login(user, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <LoginCard handleSubmit={handleSubmit} />;
};

export default Login;
