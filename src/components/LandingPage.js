import React from 'react';
import { Link } from 'react-router-dom';


const brandRed = '#a10d2f';
const crimson = '#DC143C';

const LandingPage = () => {
  return (
    <div style={styles.wrapper}>
      {/* Centered Heading */}
      <div style={styles.headerContainer}>
        <h1 style={styles.centerHeading}>
          <span style={{ color: 'black' }}>Uvu</span>{' '}
          <span style={{ color: crimson }}>Africa</span>{' '}
          <span style={{ color: 'black' }}>Leave</span>{' '}
          <span style={{ color: crimson }}>Request</span>{' '}
          <span style={{ color: 'black' }}>System</span>
        </h1>
      </div>

      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.left}>
          <h1 style={styles.logo}>
            CAPACITI
            <br />
            <span style={styles.subLogo}>Leave Request System</span>
          </h1>

          <p style={styles.tagline}>
            Where leave tracking meets <span style={{ color: brandRed }}>efficiency</span>.
          </p>
          <p style={styles.subtext}>
            Empower your organization with seamless, digital leave tracking.
            Whether you're managing a small team or a large enterprise, Capaciti Leave
            helps you stay organized, avoid scheduling conflicts, and save time.
          </p>
          <p style={styles.subtextSmall}>
            ⏱ Real-time approvals<br />
            🛡 Secure cloud-based system<br />
            📊 Smart insights for better planning
          </p>

    <div style={styles.buttons}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={styles.primaryBtn}>
                Get Started →
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section - Animated Shapes */}
        <div style={styles.right}>
          <div style={styles.shape1} />
          <div style={styles.shape2} />
          <div style={styles.shape3} />
          <div style={styles.shape4} />
          <div style={styles.shape5} />
          <div style={styles.shape6} />
          <div style={styles.shape7} />
          <div style={styles.shape8} />
        </div>
      </div>

      {/* Centered Cards Section */}
      <div style={styles.cardsSection}>
        <div style={styles.cardsContainer}>
          <div style={{...styles.card, ...styles.card1}} className="hover-card">
            <h3 style={styles.cardTitle}>Easy Requests</h3>
            <p style={styles.cardText}>Submit leave requests in seconds, anytime, anywhere.</p>
          </div>
          <div style={{...styles.card, ...styles.card2}} className="hover-card">
            <h3 style={styles.cardTitle}>Instant Approvals</h3>
            <p style={styles.cardText}>Managers can approve or decline with one click.</p>
          </div>
          <div style={{...styles.card, ...styles.card3}} className="hover-card">
            <h3 style={styles.cardTitle}>Clear History</h3>
            <p style={styles.cardText}>Track all your past leave requests effortlessly.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        .hover-card:hover h3 {
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(30px) rotate(360deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(20px) rotate(90deg); }
          50% { transform: translateY(-30px) translateX(0px) rotate(180deg); }
          75% { transform: translateY(-15px) translateX(-20px) rotate(270deg); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(20px) translateX(-25px) rotate(120deg); }
          66% { transform: translateY(-10px) translateX(25px) rotate(240deg); }
        }
        
        @keyframes float6 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-25px) translateX(15px) rotate(45deg) scale(1.1); }
          50% { transform: translateY(-10px) translateX(-30px) rotate(90deg) scale(0.9); }
          75% { transform: translateY(15px) translateX(10px) rotate(135deg) scale(1.05); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float7 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-35px) scale(1.15); }
        }
        
        @keyframes float8 {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(20px) translateY(-15px) rotate(90deg); }
          50% { transform: translateX(0px) translateY(-30px) rotate(180deg); }
          75% { transform: translateX(-20px) translateY(-15px) rotate(270deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-25px); }
          60% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  headerContainer: {
    textAlign: 'center',
    padding: '2rem 0',
    marginBottom: '3rem',
  },
  centerHeading: {
    fontSize: '3rem',
    fontWeight: '900',
    margin: 0,
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    padding: '0 2rem',
  },
  left: {
    flex: 1,
    maxWidth: '50%',
    paddingRight: '2rem',
  },
  logo: {
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 12,
    color: crimson,
    lineHeight: 1.1,
  },
  subLogo: {
    fontSize: 20,
    fontWeight: '600',
    color: crimson,
  },
  tagline: {
    fontSize: 20,
    marginBottom: 16,
    color: '#000',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    lineHeight: 1.6,
  },
  subtextSmall: {
    fontSize: 14,
    color: '#777',
    marginBottom: 32,
    lineHeight: 1.5,
  },
  buttons: {
    display: 'flex',
    gap: 16,
  },
  primaryBtn: {
    backgroundColor: crimson,
    color: '#fff',
    padding: '0.9rem 2rem',
    borderRadius: 30,
    fontWeight: 'bold',
    fontSize: 18,
    boxShadow: '0 4px 12px rgba(161,13,47,0.3)',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  right: {
    flex: 1,
    position: 'relative',
    height: '400px',
    maxWidth: '50%',
  },
  shape1: {
    position: 'absolute',
    top: '30px',
    left: '50px',
    width: '100px',
    height: '100px',
    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
    borderRadius: '50%',
    animation: 'float1 4s ease-in-out infinite',
    opacity: 0.8,
    boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)',
  },
  shape2: {
    position: 'absolute',
    top: '100px',
    right: '40px',
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50%',
    animation: 'float2 3s ease-in-out infinite',
    opacity: 0.7,
    boxShadow: '0 6px 15px rgba(102, 126, 234, 0.3)',
  },
  shape3: {
    position: 'absolute',
    top: '200px',
    left: '30px',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
    borderRadius: '50%',
    animation: 'float3 5s ease-in-out infinite',
    opacity: 0.6,
    boxShadow: '0 6px 18px rgba(79, 172, 254, 0.3)',
  },
  shape4: {
    position: 'absolute',
    bottom: '120px',
    right: '70px',
    width: '70px',
    height: '70px',
    background: 'linear-gradient(45deg, #f093fb, #f5576c)',
    borderRadius: '50%',
    animation: 'pulse 3s ease-in-out infinite',
    boxShadow: '0 6px 16px rgba(240, 147, 251, 0.4)',
  },
  shape5: {
    position: 'absolute',
    bottom: '50px',
    left: '80px',
    width: '90px',
    height: '90px',
    background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    borderRadius: '50%',
    animation: 'float5 4.5s ease-in-out infinite',
    opacity: 0.7,
    boxShadow: '0 8px 18px rgba(161, 140, 209, 0.3)',
  },
  shape6: {
    position: 'absolute',
    top: '160px',
    left: '140px',
    width: '50px',
    height: '50px',
    background: 'linear-gradient(45deg, #fd746c, #ff9068)',
    borderRadius: '50%',
    animation: 'float6 6s ease-in-out infinite',
    opacity: 0.8,
    boxShadow: '0 5px 12px rgba(253, 116, 108, 0.3)',
  },
  shape7: {
    position: 'absolute',
    top: '80px',
    left: '120px',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
    borderRadius: '50%',
    animation: 'float7 3.5s ease-in-out infinite',
    opacity: 0.9,
    boxShadow: '0 4px 10px rgba(255, 236, 210, 0.4)',
  },
  shape8: {
    position: 'absolute',
    bottom: '180px',
    right: '20px',
    width: '65px',
    height: '65px',
    background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
    borderRadius: '50%',
    animation: 'float8 4s ease-in-out infinite',
    opacity: 0.75,
    boxShadow: '0 6px 14px rgba(168, 237, 234, 0.3)',
  },
  cardsSection: {
    marginTop: '4rem',
    padding: '3rem 2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  cardsContainer: {
    display: 'flex',
    gap: '2rem',
    maxWidth: '900px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '250px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #eee',
  },
  card1: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  card2: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  },
  card3: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'white',
    transition: 'color 0.3s ease',
  },
  cardText: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1.6,
  },
};

// This is the main App component
export default function App() {
  return <LandingPage />;
}