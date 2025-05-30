import React, { useState, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const RequestLeave = () => {
  const { user } = useContext(AuthContext);
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [documentLink, setDocumentLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const newRequest = {
      id: Date.now(),
      username: user.username,
      name: user.name,
      surname: user.surname,
      leaveType,
      reason,
      dateFrom,
      dateUntil,
      documentLink,
      status: 'Pending',
    };

    leaveRequests.push(newRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    setMessage('✅ Your leave request has been submitted successfully!');

    // Reset form
    setLeaveType('');
    setReason('');
    setDateFrom('');
    setDateUntil('');
    setDocumentLink('');
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📝 Submit a Leave Request</h2>
        {message && <p style={styles.successMessage}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>👤 Employee:</label>
            <span style={styles.info}>{user.name} {user.surname}</span>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>🏷️ Leave Type:</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              style={styles.input}
              required
            >
              <option value="" disabled>-- Select Leave Type --</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Study Leave">Study Leave</option>
              <option value="Family Responsibility">Family Responsibility</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>📅 From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>📅 Until:</label>
            <input
              type="date"
              value={dateUntil}
              onChange={(e) => setDateUntil(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>📝 Reason:</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              placeholder="Briefly explain why you need time off..."
              style={{ ...styles.input, resize: 'vertical' }}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>📎 Document Link (e.g., Doctor's Note):</label>
            <input
              type="url"
              value={documentLink}
              onChange={(e) => setDocumentLink(e.target.value)}
              placeholder="Paste link to your document here"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>🚀 Submit Request</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  info: {
    fontSize: '1rem',
    color: '#444',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#a10d2f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default RequestLeave;


