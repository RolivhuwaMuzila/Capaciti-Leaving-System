import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NavBar from './NavBar';
import { Facebook, Mail, Instagram, Linkedin, FileText, BarChart3 } from 'lucide-react';

const crimson = '#DC143C';
const darkCrimson = '#B91C3C';
const lightCrimson = '#FEF2F2';

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
  const [socialHover, setSocialHover] = useState({});

  const welcomeMessages = user
    ? [`Hello, ${user.name}!`, 'Ready to manage your leave effortlessly?', "Let's get started!"]
    : ['Welcome to Capaciti Leave Tracking!', 'Powered by UVU Africa', 'Please login to begin your journey.'];

  const typedWelcome = useTypewriter(welcomeMessages);

  const PulseCircle = () => {
    const [scale, setScale] = useState(1);
    useEffect(() => {
      const interval = setInterval(() => {
        setScale((prev) => (prev >= 1.2 ? 1 : prev + 0.008));
      }, 30);
      return () => clearInterval(interval);
    }, []);
    return (
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${crimson}15, transparent)`,
          zIndex: 0,
          pointerEvents: 'none',
          transform: `translateX(-50%) scale(${scale})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    );
  };

  const buttonStyle = (hover) => ({
    backgroundColor: hover ? darkCrimson : crimson,
    color: 'white',
    padding: '1.2rem 2.8rem',
    borderRadius: '16px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hover ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: hover
      ? `0 12px 30px ${crimson}35, 0 4px 8px ${crimson}20`
      : `0 6px 20px ${crimson}25`,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.8rem',
    userSelect: 'none',
    border: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
  });

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Mail, label: 'Email', href: 'mailto:support@capaciti.org' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
      <NavBar />

      <section style={{
        background: `linear-gradient(135deg, white 0%, ${lightCrimson} 50%, white 100%)`,
        flex: 1,
        padding: '6rem 2rem 5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <PulseCircle />

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          color: crimson,
          marginBottom: '2rem',
          zIndex: 2,
          minHeight: '5rem',
          letterSpacing: '-0.03em',
          lineHeight: '1.1',
          textShadow: `0 2px 4px ${crimson}20`,
        }}>
          {typedWelcome}
          <span style={{
            color: crimson,
            fontWeight: '800',
            animation: 'blink 1s step-start infinite',
          }}>|</span>
        </h1>

        <p style={{
          fontSize: '1.3rem',
          maxWidth: '650px',
          color: '#374151',
          marginBottom: '4rem',
          zIndex: 2,
          fontWeight: '500',
          lineHeight: '1.7',
          textAlign: 'center',
        }}>
          Streamline your leave management with our intuitive platform, powered by{' '}
          <span style={{
            color: crimson,
            fontWeight: '700',
            background: `linear-gradient(135deg, ${crimson}, ${darkCrimson})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            UVU Africa
          </span>
        </p>

        <div style={{
          display: 'flex',
          gap: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          zIndex: 2,
          marginBottom: '2rem',
        }}>
          <Link to="/request-leave" style={buttonStyle(hovered.request)}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, request: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, request: false }))}>
            <FileText size={20} />
            Apply for Leave
          </Link>
          <Link to="/leave-status" style={buttonStyle(hovered.status)}
            onMouseEnter={() => setHovered((prev) => ({ ...prev, status: true }))}
            onMouseLeave={() => setHovered((prev) => ({ ...prev, status: false }))}>
            <BarChart3 size={20} />
            View Leave Status
          </Link>
        </div>
      </section>

      <footer style={{
        backgroundColor: 'white',
        borderTop: `2px solid ${lightCrimson}`,
        padding: '3rem 2rem 2rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${crimson}, transparent)`,
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div style={{
            textAlign: 'center',
            color: '#6B7280',
            fontSize: '0.95rem',
            fontWeight: '500',
          }}>
            <p style={{ margin: 0, marginBottom: '0.5rem' }}>
              © {new Date().getFullYear()} Capaciti Leave Tracker
            </p>
            <p style={{
              margin: 0,
              color: crimson,
              fontWeight: '600',
              fontSize: '1rem',
            }}>
              Powered by UVU Africa
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: socialHover[idx] ? crimson : 'white',
                    color: socialHover[idx] ? 'white' : '#6B7280',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    transform: socialHover[idx] ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                    boxShadow: socialHover[idx]
                      ? `0 8px 25px ${crimson}30, 0 2px 10px ${crimson}20`
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    border: `2px solid ${socialHover[idx] ? crimson : '#E5E7EB'}`,
                  }}
                  onMouseEnter={() => setSocialHover(prev => ({ ...prev, [idx]: true }))}
                  onMouseLeave={() => setSocialHover(prev => ({ ...prev, [idx]: false }))}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <div style={{
            width: '100%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${lightCrimson}, transparent)`,
            marginTop: '1rem',
          }} />
        </div>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", system-ui, sans-serif;
        }

        @media (max-width: 768px) {
          main section {
            padding: 4rem 1rem 3rem !important;
          }
          footer {
            padding: 2rem 1rem 1.5rem !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
