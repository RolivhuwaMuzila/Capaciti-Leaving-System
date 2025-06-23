import React, { useState, useContext } from 'react';
import { Home, FileText, BarChart3, Calendar, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);

  const crimson = '#DC143C';
  const darkCrimson = '#B91C3C';
  const lightCrimson = '#FEF2F2';

  const handleLogout = () => {
    logout(); // clears user context
    navigate('/'); // redirects to landing or login page
  };

  const navItems = [
    { to: '/home', icon: Home, label: 'Home', id: 'home' },
    { to: '/request-leave', icon: FileText, label: 'Request Leave', id: 'request' },
    ...(user?.role === 'Manager'
      ? [{ to: '/manager-dashboard', icon: BarChart3, label: 'Dashboard', id: 'dashboard' }]
      : []),
    ...(user?.role === 'Employee'
      ? [{ to: '/leave-status', icon: Calendar, label: 'Leave Status', id: 'status' }]
      : []),
  ];

  const linkStyle = (isHovered) => ({
    color: isHovered ? crimson : '#374151',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    position: 'relative',
    backgroundColor: isHovered ? lightCrimson : 'transparent',
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered ? `0 4px 12px ${crimson}20` : 'none',
  });

  const logoutButtonStyle = (isHovered) => ({
    background: isHovered
      ? `linear-gradient(135deg, ${crimson} 0%, ${darkCrimson} 100%)`
      : 'white',
    border: `2px solid ${crimson}`,
    color: isHovered ? 'white' : crimson,
    padding: '0.7rem 1.4rem',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered
      ? `0 6px 20px ${crimson}30`
      : `0 2px 8px ${crimson}15`,
  });

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'white',
      padding: '1.2rem 2.5rem',
      boxShadow: `0 2px 20px rgba(220, 20, 60, 0.1)`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: `3px solid ${lightCrimson}`,
      backdropFilter: 'blur(10px)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          margin: 0,
          letterSpacing: '1px',
          background: `linear-gradient(135deg, ${crimson}, ${darkCrimson})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CAPACITI
        </h1>
        <div style={{
          fontSize: '0.8rem',
          marginTop: '-2px',
          letterSpacing: '0.5px',
          fontWeight: '500',
          color: '#6B7280',
        }}>
          Leave Management
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {navItems.map(({ id, to, icon: Icon, label }) => (
          <Link
            key={id}
            to={to}
            style={linkStyle(hoveredLink === id)}
            onMouseEnter={() => setHoveredLink(id)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Icon size={18} strokeWidth={2.5} />
            {label}
          </Link>
        ))}

        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginLeft: '1.5rem',
            paddingLeft: '1.5rem',
            borderLeft: `1px solid ${lightCrimson}`,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151',
              }}>
                Welcome, {user.name || user.email}!
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: crimson,
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={logoutButtonStyle(hoveredLink === 'logout')}
              onMouseEnter={() => setHoveredLink('logout')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <LogOut size={16} strokeWidth={2.5} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
