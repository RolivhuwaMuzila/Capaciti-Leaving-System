import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    surname: '',
    role: 'Employee'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    // Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special char (*, _, &, @, #), and be at least 8 characters
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
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create an Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <p style={styles.passwordRequirements}>
            Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (*, _, &, @, #).
          </p>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.link}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '2rem 3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    padding: '0.8rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#a10d2f',
    color: '#fff',
    padding: '0.8rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  passwordRequirements: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
    textAlign: 'left',
    marginTop: '-0.5rem',
  },
  loginText: {
    fontSize: '1rem',
    color: '#555',
  },
  link: {
    color: '#a10d2f',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default Register;

