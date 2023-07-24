import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file for styling

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

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
        <div className="log--in--form--center">
          <div className="log--in--form-container">
            <h1 className="register-heading">Sign in</h1>
            <form onSubmit={handleLogin}>
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

              <div class="field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // placeholder=""
                  required
                />

                <label
                  for="password"
                  title="Password"
                  data-title="Password"
                ></label>
                <i
                  id="toggler"
                  className={showPassword ? "far fa-eye" : "far fa-eye-slash"} // Use the appropriate class based on showPassword state
                  onClick={togglePasswordVisibility}
                ></i>
              </div>

              {/* <div className="additional-options-container">
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <span className="remember-me-text">Remember Me</span>
                </label>

                <div className="forgot-password-container">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div> */}

              <div className="additional-options-container">
                <div
                  className="remember-me-container"
                  onClick={handleRememberMeChange}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    readOnly // So the checkbox is not editable through the UI
                    className="remember-me-checkbox"
                  />

                  <span className="remember-me-text">Remember me</span>
                </div>

                <div className="forgot-password-container">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>

              <button type="submit" className="btn-register">
                Sign in
              </button>
            </form>

            <div className="log--in--form--auth--container">
              <p>or sign in with </p>
              <div className="log--in--form--social--buttons">
                <div className="log--in--form--google--button">
                  <img
                    src={require("./icons/google.svg").default}
                    className="social-icon"
                    alt="Google"
                  />
                </div>

                <div className="log--in--form--facebook--button">
                  <img
                    src={require("./icons/facebook.svg").default}
                    className="social-icon"
                    alt="Facebook"
                  />
                </div>

                <div className="log--in--form--apple--button">
                  <img
                    src={require("./icons/apple-logo.svg").default}
                    className="social-icon"
                    alt="Apple"
                  />
                </div>
              </div>
            </div>

            <div className="register-link-container">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="register-link">
                  Sign up
                </Link>
              </p>
            </div>
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

export default LoginPage;
