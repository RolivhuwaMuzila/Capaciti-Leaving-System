import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/uvu africa.png'; // Import the logo

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      {/* Logo on the left */}
      <div className="logo-container">
        <img src={logo} alt="UVU Africa" className="logo" />
      </div>

      {/* Navigation Links on the Right */}
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/request-leave">Request Leave</Link>
        {user && user.role === 'Manager' && <Link to="/manager-dashboard">Manager Dashboard</Link>}
        {user && user.role === 'Employee' && <Link to="/leave-status">Leave Pending</Link>}
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
