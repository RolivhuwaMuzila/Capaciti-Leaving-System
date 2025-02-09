import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const landingStyle = {
    textAlign: 'center',
    marginTop: '100px'
  };

  return (
    <div style={landingStyle}>
      <h1>Welcome to Capaciti</h1>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login">
          <button style={{ marginRight: '10px' }}>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
