import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const brandRed = '#a10d2f';

// Typewriter hook
const useTypewriter = (texts, speed = 120, pause = 1500) => {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    let timeout;

    if (!deleting && charIndex <= texts[textIndex].length) {
      timeout = setTimeout(() => {
        setDisplay(texts[textIndex].substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplay(texts[textIndex].substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else if (charIndex === texts[textIndex].length + 1) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (charIndex === -1) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return display;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const [hovered, setHovered] = useState({ request: false, status: false });

  const welcomeMessages = user
    ? [`Hello, ${user.name}!`, 'Ready to manage your leave effortlessly?', 'Let’s get started!']
    : ['Welcome to Capaciti Leave Tracking!', 'Powered by UVU Africa', 'Please login to begin your journey.'];

  const typedWelcome = useTypewriter(welcomeMessages);

  // Background pulse
  const PulseCircle = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setScale((prev) => (prev >= 1.15 ? 1 : prev + 0.01));
      }, 25);
      return () => clearInterval(interval);
    }, []);

    return (
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 0,
          pointerEvents: 'none',
          width: 250,
          height: 250,
        }}
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={brandRed}
          opacity="0.08"
          style={{ transformOrigin: 'center', transform: `scale(${scale})` }}
        />
      </svg>
    );
  };

  const buttonStyle = (hover) => ({
    backgroundColor: hover ? '#7a071c' : brandRed,
    color: '#fff',
    padding: '0.85rem 2.2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hover ? 'scale(1.1)' : 'scale(1)',
    boxShadow: hover ? '0 6px 18px rgba(161, 13, 47, 0.4)' : 'none',
    display: 'inline-block',
    userSelect: 'none',
  });

  return (
    <main style={styles.container}>
      <NavBar />
      <section style={styles.hero}>
        <PulseCircle />
        <h1 style={styles.heading}>
          {typedWelcome}
          <span style={styles.cursor}>|</span>
        </h1>

        <p style={styles.description}>
          Powered by <strong>UVU Africa</strong>, making your leave process seamless and hassle-free.
        </p>

        <div style={styles.buttonContainer}>
          <Link
            to="/request-leave"
            style={buttonStyle(hovered.request)}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, request: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, request: false }))}
          >
            ✍️ Apply for Leave
          </Link>
          <Link
            to="/leave-status"
            style={buttonStyle(hovered.status)}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, status: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, status: false }))}
          >
            📊 View Leave Status
          </Link>
        </div>
      </section>

      <footer style={styles.footer}>
        <hr style={styles.footerLine} />
        <p>© {new Date().getFullYear()} Capaciti Leave Tracker • UVU Africa</p>
        <div style={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Facebook">📘</a>
          <a href="mailto:support@capaciti.org" style={styles.socialLink} aria-label="Email support">📧</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Instagram">📷</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="LinkedIn">💼</a>
        </div>
      </footer>
    </main>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    backgroundColor: '#fff0f0',
    flex: 1,
    padding: '5rem 2rem 4rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: '900',
    color: brandRed,
    marginBottom: '1rem',
    zIndex: 2,
    minHeight: '4.5rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  cursor: {
    color: brandRed,
    fontWeight: '900',
    animation: 'blink 1s step-start infinite',
  },
  description: {
    fontSize: '1.3rem',
    maxWidth: '600px',
    color: '#333',
    marginBottom: '3rem',
    zIndex: 2,
    fontWeight: '500',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    zIndex: 2,
  },
  footer: {
    backgroundColor: 'transparent',
    color: '#333',
    padding: '1.5rem 2rem',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1rem',
  },
  footerLine: {
    border: 'none',
    borderTop: '1px solid #ccc',
    marginBottom: '1rem',
    width: '100%',
  },
  socials: {
    marginTop: '0.7rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.3rem',
  },
  socialLink: {
    fontSize: '1.6rem',
    color: '#333',
    textDecoration: 'none',
    transition: 'transform 0.25s ease',
    userSelect: 'none',
  },
};

// Add blink keyframes globally
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
if (styleSheet && styleSheet.insertRule) {
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

export default Home;
