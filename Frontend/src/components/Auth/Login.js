import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authService from "../../services/authService";
import "./login.css"; // Import CSS file for styles

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // For programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      onLogin();
      history.push("/"); // Navigate programmatically after login
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;