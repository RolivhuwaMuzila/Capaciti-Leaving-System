import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/uvu africa.png'; // Ensure this path is correct

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to Capaciti Leave Tracking</h1>
        <p style={styles.subtitle}>
          Powered by <strong>UVU Africa</strong>, making your leave process seamless and hassle-free.<br />
          {user?.name ? `Hello, ${user.name}! Ready to manage your leave effortlessly?` : 'Login to get started!'}
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/request-leave" style={styles.button}>📝 Request Leave</Link>
          <Link to="/leave-status" style={styles.button}>📍 Track Leave Status</Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>✨ Why Choose Capaciti Leave System?</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Easy Leave Requests</h3>
            <p style={styles.cardDescription}>Submit your leave requests in just a few clicks, no paperwork needed!</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Real-Time Tracking</h3>
            <p style={styles.cardDescription}>Monitor your leave status in real-time, anywhere, anytime.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Transparent Communication</h3>
            <p style={styles.cardDescription}>Stay informed with clear communication between you and your manager.</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Innovative by UVU Africa</h3>
            <p style={styles.cardDescription}>We bring the power of digital transformation to make your leave process smooth and easy.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={styles.testimonial}>
        <h2 style={styles.sectionTitle}>💬 What Our Users Say</h2>
        <div style={styles.testimonialCard}>
          <blockquote style={styles.quote}>
            "Capaciti’s system is a game-changer! It’s quick, efficient, and saves me so much time. I can focus on what matters most." <br />
            <cite>— Thandi M., Team Lead</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

const absaRed = '#a10d2f';

const styles = {
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem',
    backgroundColor: '#fff4f4',
  },
  logo: {
    height: '70px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: absaRed,
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  button: {
    backgroundColor: absaRed,
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
  },
  features: {
    padding: '2.5rem 1rem',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: absaRed,
    marginBottom: '1.2rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: absaRed,
    fontWeight: '700',
    marginBottom: '0.8rem',
  },
  cardDescription: {
    color: '#555',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  testimonial: {
    padding: '2.5rem 1rem',
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  quote: {
    fontStyle: 'italic',
    color: '#555',
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
};

export default Home;

