import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // Simple 10-digit validation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = signupData;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePhone(trimmedPhone)) {
      setError("Phone number must be 10 digits");
      return;
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          password: trimmedPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful!");
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-page">
      <div className="empowerment-section">
        <div className="empowerment-content">
          <h1>SheConnects</h1>
          <div className="empowerment-quotes">
            <p>"When women support each other, incredible things happen."</p>
          </div>
        </div>
      </div>
      
      <div className="signup-section">
        <div className="signup-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={signupData.phone}
                onChange={handleChange}
                placeholder="Enter your number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="Enter your password "
                minLength="6"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="signup-button">Sign Up</button>
            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;