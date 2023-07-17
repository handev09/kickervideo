import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Import the CSS file for styling

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await fetch(
        "https://kickervideoapi.vercel.app/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Registration successful! Welcome, ${data.name}.`);
        navigate(
          `/dashboard?userId=${data.userId}&name=${encodeURIComponent(
            data.name
          )}`
        );
      } else {
        setResponseMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setResponseMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-parent-container">
    <div className="register-container">
      <h1 className="register-heading">Join KickerVideo</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn-register">
          Join Now
        </button>
      </form>

      <div className="response-message">{responseMessage}</div>
    </div>
    </div>
  );
};

export default RegisterPage;
