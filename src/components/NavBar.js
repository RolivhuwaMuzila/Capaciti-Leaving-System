import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/uvu africa.png'; // Ensure logo exists

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
  <nav style={styles.navbar}>
    {/* Logo replaced with text "CAPACITI" */}
    <div style={styles.logoContainer}>
      <h1 style={styles.logoText}>CAPACITI</h1>
    </div>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        <Link style={styles.link} to="/home">🏠 Home</Link>
        <Link style={styles.link} to="/request-leave">📝 Request Leave</Link>
        {user?.role === 'Manager' && (
          <Link style={styles.link} to="/manager-dashboard">📊 Dashboard</Link>
        )}
        {user?.role === 'Employee' && (
          <Link style={styles.link} to="/leave-status">📅 Leave Status</Link>
        )}
        {user && (
          <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Logout</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a10d2f', // teal green
    padding: '0.8rem 2rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    width: 'auto',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  logoutBtn: {
    backgroundColor: '#004d40',
    border: 'none',
    color: '#fff',
    padding: '0.4rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default NavBar;
