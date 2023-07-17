import React, { useState } from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await fetch('https://kickervideoapi.vercel.app/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Registration successful! Welcome, ${data.name}.`);
      } else {
        setResponseMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setResponseMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br/><br/>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>

        <button type="submit">Register</button>
      </form>

      <div>{responseMessage}</div>
    </div>
  );
};

export default RegisterPage;
