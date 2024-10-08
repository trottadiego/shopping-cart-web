import React, { useState } from "react";
import "./styles.scss";
import { LoginCardProps } from "./types";

const LoginCard: React.FC<LoginCardProps> = ({ handleSubmit }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(user, password);
  };

  return (
    <div className="login-card">
      <h1>Login</h1>
      <div className="form-group">
        <label>Usuario</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button" onClick={onSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginCard;
