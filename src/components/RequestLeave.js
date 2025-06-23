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
    e.preventDefault(); // ✅ Prevent reload

    // ✅ Use localStorage for persistence across sessions
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

    // Reset form fields
    setLeaveType('');
    setReason('');
    setDateFrom('');
    setDateUntil('');
    setDocumentLink('');
  };

  return (
    <div style={styles.pageBackground}>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>📝 Submit a Leave Request</h2>
          <div style={styles.headerAccent}></div>
        </div>

        {message && <div style={styles.successMessage}>{message}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.employeeInfo}>
            <div style={styles.field}>
              <label style={styles.label}>👤 Employee:</label>
              <span style={styles.info}>{user?.name} {user?.surname}</span>
            </div>
          </div>

          <div style={styles.formGrid}>
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

            <div style={styles.dateRow}>
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
            </div>

            <div style={styles.field}>
              <label style={styles.label}>📝 Reason:</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                placeholder="Briefly explain why you need time off..."
                style={styles.textarea}
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
          </div>

          <button type="submit" style={styles.button}>
            🚀 Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '2rem 1rem',
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '2.5rem',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(220, 20, 60, 0.1), 0 4px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(220, 20, 60, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    position: 'relative',
  },
  heading: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  headerAccent: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #dc143c, #b91c3c)',
    margin: '0 auto',
    borderRadius: '2px',
  },
  successMessage: {
    color: '#16a085',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#d5f5f0',
    borderRadius: '8px',
    border: '1px solid #7dd3c0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  employeeInfo: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    border: '2px solid #dc143c',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  dateRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2c3e50',
    fontSize: '1rem',
  },
  input: {
    padding: '0.875rem',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  textarea: {
    padding: '0.875rem',
    borderRadius: '8px',
    border: '2px solid #e9ecef',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    transition: 'all 0.3s ease',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
  },
  info: {
    fontSize: '1.1rem',
    color: '#dc143c',
    fontWeight: '600',
    padding: '0.5rem 0',
  },
  button: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #dc143c 0%, #b91c3c 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(220, 20, 60, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

export default RequestLeave;
