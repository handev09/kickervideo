import React, { useState } from 'react';
import './SignUp.css';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo-container">
          {/* Place your logo here */}
          <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group password-toggle">
            <label htmlFor="password">Password</label>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
              />
              <span onClick={handleTogglePassword}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div>
            <button type="button">Sign up with Google</button>
            <button type="button">Sign up with Facebook</button>
            <button type="button">Sign up with Apple</button>
          </div>
        </form>
      </div>
      <div style={{ width: '35%', textAlign: 'center' }}>
        {/* Replace the image URL below with your image */}
        <img src="/path/to/your/image.jpg" alt="Image" style={{ width: '100%' }} />
      </div>
    </div>
  );
};

export default SignupPage;
