import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import SignupPage from './SignUp';
import LoginPage from './LoginPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
  );
}

export default App;
