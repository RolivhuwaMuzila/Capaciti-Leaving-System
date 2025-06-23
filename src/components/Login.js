import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'radial-gradient(circle at left, #ffffff, #f5f5f5)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 0 30px rgba(220, 20, 60, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  icon: {
    backgroundColor: '#dc143c',
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    margin: '0 auto 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 15px rgba(220, 20, 60, 0.4)',
  },
  iconInner: {
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    background: 'linear-gradient(90deg, #dc143c, #b91c3c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtext: {
    marginBottom: '2rem',
    color: '#666',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.2rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ccc',
    color: '#333',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderBottom: '1px solid #dc143c',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#dc143c',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#b91c3c',
  },
  bottomText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#dc143c',
    marginLeft: '0.3rem',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const [hover, setHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      setError('');
      navigate('/home');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.icon}><div style={styles.iconInner} /></div>
        <div style={styles.heading}>Welcome Back</div>
        <div style={styles.subtext}>Sign in to your account</div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            ...styles.input,
            ...(focusedInput === 'username' ? styles.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput('')}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...styles.input,
            ...(focusedInput === 'password' ? styles.inputFocus : {})
          }}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput('')}
        />

        {error && <div style={{ color: '#dc143c', marginBottom: '1rem' }}>{error}</div>}

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {})
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          SIGN IN
        </button>

        <div style={styles.bottomText}>
          Don't have an account?
          <span style={styles.link} onClick={() => navigate('/register')}>Create one here</span>
        </div>
      </form>
    </div>
  );
};

export default Login;