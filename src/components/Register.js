import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 0 30px rgba(220, 20, 60, 0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.2rem',
    background: 'linear-gradient(90deg, #dc143c, #a80028)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    color: '#333',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#dc143c',
    boxShadow: '0 0 0 3px rgba(220, 20, 60, 0.1)',
  },
  select: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ccc',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    appearance: 'none',
  },
  button: {
    backgroundColor: '#dc143c',
    color: '#fff',
    padding: '0.9rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1.2rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#a80028',
  },
  error: {
    color: '#dc143c',
    fontSize: '0.9rem',
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
    textAlign: 'left',
  },
  passwordRequirements: {
    fontSize: '0.85rem',
    color: '#777',
    textAlign: 'left',
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
  },
  loginText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#dc143c',
    marginLeft: '0.3rem',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    email: '',
    cohort: 'Absa',
    role: 'Employee',
  });

  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState('');
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*_&@#])[A-Za-z\d*_&@#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setError(
        'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character (*, _, &, @, #).'
      );
      return;
    }

    const result = register(formData);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.heading}>Create an Account</div>
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'username' ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput('')}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'password' ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput('')}
          />

          <p style={styles.passwordRequirements}>
            Password must be at least 8 characters, include uppercase, lowercase, number, and one special character (*, _, &, @, #).
          </p>

          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'name' ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput('')}
          />

          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'surname' ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusedInput('surname')}
            onBlur={() => setFocusedInput('')}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              ...(focusedInput === 'email' ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput('')}
          />

          <select
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Absa">Absa</option>
            <option value="FNB">FNB</option>
            <option value="Wimpro">Wimpro</option>
            <option value="AI">AI</option>
            <option value="Demand">Demand</option>
            <option value="Dev">Dev</option>
            <option value="BSG">BSG</option>
          </select>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Register
          </button>
        </div>

        <div style={styles.loginText}>
          Already have an account?
          <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
