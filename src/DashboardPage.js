import React from 'react';
import { useLocation } from 'react-router-dom';
import './DashboardPage.css'; // Import the CSS file for styling

const DashboardPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const name = queryParams.get('name');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-heading">KickerVideo Dashboard</h1>
        <div className="user-profile">
          <span className="user-name">Welcome, {name}!</span>
          <span className="user-id">User ID: {userId}</span>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Add your dashboard content here */}
        <p>This is your dashboard content.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
