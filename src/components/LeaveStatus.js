import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const LeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [myLeaves, setMyLeaves] = useState([]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const filtered = requests.filter(req => req.username === user.username);
    setMyLeaves(filtered);
  }, [user.username]);

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>📋 My Leave Requests</h2>

        {myLeaves.length === 0 ? (
          <p style={styles.noData}>🚫 No leave requests submitted yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>📌 Type</th>
                <th>📅 From</th>
                <th>📅 Until</th>
                <th>📝 Reason</th>
                <th>⏳ Status</th>
                <th>👨‍💼 Manager</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.map((req) => (
                <tr key={req.id}>
                  <td>{req.leaveType}</td>
                  <td>{req.dateFrom}</td>
                  <td>{req.dateUntil}</td>
                  <td>{req.reason}</td>
                  <td style={{ color: getStatusColor(req.status), fontWeight: 'bold' }}>
                    {req.status}
                  </td>
                  <td>{req.managerName || 'Pending Assignment'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'green';
    case 'declined':
      return 'red';
    case 'pending':
    default:
      return 'orange';
  }
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '1rem 2rem',
    background: '#fdfdfd',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  noData: {
    textAlign: 'center',
    color: '#555',
    fontStyle: 'italic',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
  }
};

export default LeaveStatus;
