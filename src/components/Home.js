import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/uvu africa.png'; // Ensure this image is correctly placed in your project

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Capaciti Leave Tracking System</h1>
        <p>
          At <strong>UVU Africa</strong>, we empower professionals by providing innovative learning
          experiences and career growth opportunities. Capaciti ensures a seamless leave request
          process for employees and managers.
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions">
        <Link to="/request-leave" className="quick-button">Request Leave</Link>
        <Link to="/leave-status" className="quick-button">Check Leave Status</Link>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial">
        <h2>Why Employees Love Capaciti</h2>
        <p>
          "Capaciti has transformed how we manage leave. The digital process saves time and makes it
          easy to plan work schedules. I can track my leave status in real-time!" <br />
          <em>— A Satisfied Employee</em>
        </p>
      </div>
    </div>
  );
};

export default Home;
