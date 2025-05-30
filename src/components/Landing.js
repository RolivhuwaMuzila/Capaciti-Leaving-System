import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const absaRed = '#a10d2f';

const HoverCard = ({ icon, title, text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        background: hovered
          ? `linear-gradient(135deg, ${absaRed}33, #fff)`
          : '#fff',
        boxShadow: hovered
          ? `0 10px 25px ${absaRed}80`
          : '0 3px 10px rgba(0,0,0,0.1)',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        borderRadius: hovered ? '18px' : '14px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: '2.8rem', marginBottom: '1rem', color: absaRed }}>
        {icon}
      </div>
      <h3 style={{ ...styles.cardTitle, color: hovered ? absaRed : '#a10d2fcc' }}>
        {title}
      </h3>
      <p style={{ ...styles.cardText, color: hovered ? '#4a4a4a' : '#555' }}>{text}</p>
    </div>
  );
};

const Landing = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);

  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Capaciti Leave System</h1>
        <p style={styles.subtitle}>
          Streamline leave management with smart automation and instant updates.
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/login">
            <button
              style={{
                ...styles.primaryButton,
                background: loginHover
                  ? `radial-gradient(circle at center, ${absaRed}cc, #7c081f)`
                  : absaRed,
                boxShadow: loginHover
                  ? `0 8px 24px ${absaRed}bb`
                  : `0 4px 12px ${absaRed}88`,
                transform: loginHover ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setLoginHover(true)}
              onMouseLeave={() => setLoginHover(false)}
            >
              🔑 Login
            </button>
          </Link>
          <Link to="/register">
            <button
              style={{
                ...styles.secondaryButton,
                backgroundColor: registerHover ? '#444' : '#222',
                boxShadow: registerHover
                  ? `0 8px 24px rgba(0,0,0,0.4)`
                  : '0 4px 12px rgba(0,0,0,0.25)',
                transform: registerHover ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setRegisterHover(true)}
              onMouseLeave={() => setRegisterHover(false)}
            >
              📝 Register
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Features at a Glance</h2>
        <div style={styles.cardWrapper}>
          <HoverCard icon="🕒" title="Fast Apply" text="Request leave in just a few clicks." />
          <HoverCard icon="🔔" title="Instant Alerts" text="Get notified on approvals and changes." />
          <HoverCard icon="🌍" title="Made for Africa" text="Designed with local needs in mind." />
        </div>
      </section>

      {/* Testimonial */}
      <section style={styles.testimonialSection}>
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.testimonialCard}>
          <p style={styles.quote}>
            “Capaciti took the headache out of leave management. Highly recommend it!”
          </p>
          <div style={styles.bubbleTail}></div>
          <cite style={styles.cite}>— Lebo N., Team Lead</cite>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Capaciti Leave System | Powered by UVU Africa</p>
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>📘</a>
          <a href="mailto:support@capaciti.org" style={styles.socialIcon}>✉️</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>📷</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialIcon}>💼</a>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#fff',
    color: '#2b2b2b',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6,
  },
  hero: {
    padding: '6rem 2rem 5rem',
    textAlign: 'center',
    background: `linear-gradient(180deg, ${absaRed}20, #fff)`,
    borderBottom: `3px solid ${absaRed}44`,
  },
  title: {
    fontSize: '3.4rem',
    fontWeight: '900',
    color: absaRed,
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  subtitle: {
    fontSize: '1.25rem',
    maxWidth: '580px',
    margin: '0 auto 3rem',
    color: '#444',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.4rem',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#fff',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: `0 5px 15px ${absaRed}88`,
    outline: 'none',
  },
  secondaryButton: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ddd',
    backgroundColor: '#222',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
    outline: 'none',
  },
  features: {
    padding: '5rem 2rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.1rem',
    color: absaRed,
    fontWeight: '800',
    marginBottom: '2.5rem',
    letterSpacing: '0.06em',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2.5rem',
  },
  card: {
    maxWidth: '320px',
    padding: '2rem 1.8rem',
    borderRadius: '14px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '0.7rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#555',
  },
  testimonialSection: {
    backgroundColor: '#fff0f2',
    padding: '5rem 2rem',
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    maxWidth: '620px',
    margin: '0 auto',
    padding: '3rem 2.5rem',
    borderRadius: '16px',
    boxShadow: `0 10px 30px ${absaRed}50`,
    position: 'relative',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '1.3rem',
    color: '#222',
    lineHeight: 1.5,
  },
  bubbleTail: {
    content: '""',
    position: 'absolute',
    bottom: '-18px',
    left: '50%',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: `12px solid #fff`,
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
  },
  cite: {
    marginTop: '1.3rem',
    color: absaRed,
    fontWeight: '900',
    fontSize: '1.1rem',
  },
  footer: {
    backgroundColor: absaRed,
    color: '#fff',
    padding: '2rem 1rem',
    textAlign: 'center',
    marginTop: 'auto',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
  },
  socialIcons: {
    marginTop: '1.1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    fontSize: '1.7rem',
  },
  socialIcon: {
    color: '#fff',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    userSelect: 'none',
  },
};

export default Landing;

