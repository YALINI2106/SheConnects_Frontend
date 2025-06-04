import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Both fields are required");
      return;
    }

    if (!validateEmail(trimmedUsername)) {
      setError("Invalid email format");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("https://sheconnects-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedUsername, password: trimmedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    }
  }; 

  return (
<div className="login-page">
      <div className="empowerment-section">
        <div className="empowerment-content">
          <h1>Welcome Back To SheConnects</h1>
          <div className="empowerment-quotes">
            <p>"When women support each other, incredible things happen."</p>
          </div>
        </div>
      </div>
      
      <div className="login-section">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">Login</button>
            <p className="signup-link">
              New user? <Link to="/signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
