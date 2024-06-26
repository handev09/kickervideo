import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Import the CSS file for styling

const ForgotPasswordPage = () => {
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
        <div className="header">
          <h1 className="logo">KickerVideo</h1>
        </div>
        <div className="sign--up--form--center">
          <div className="sign--up--form-container">
            <h1 className="register-heading">Forgot Password</h1>
            <form onSubmit={handleRegister}>
              <div className="field">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // placeholder="Email"
                  required
                />
                <label for="email" title="Email" data-title="Email"></label>
              </div>

              <button type="submit" className="btn-register">
                Reset Password
              </button>
            </form>
          </div>
        </div>

        <div className="response-message">{responseMessage}</div>
      </div>
      <div className="image-container">
        <div className="img--space--signup"></div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
