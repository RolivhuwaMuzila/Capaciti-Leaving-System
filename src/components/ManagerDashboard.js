import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const ManagerDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [declineReason, setDeclineReason] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    setLeaveRequests(requests);
  }, []);

  const updateRequestStatus = (id, newStatus, reason = '') => {
    const updatedRequests = leaveRequests.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          status: newStatus,
          managerName: `${user.name} ${user.surname}`,
          declineReason: newStatus === 'Declined' ? reason : '',
        };
      }
      return req;
    });
    setLeaveRequests(updatedRequests);
    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    setDeclineReason((prev) => ({ ...prev, [id]: '' }));
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Approved': return '#28a745';
      case 'Declined': return '#dc3545';
      case 'Pending':
      default: return '#ffc107';
    }
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Manager Dashboard</h2>
        <p style={styles.subtext}>
          Welcome, <strong>{user.name} {user.surname}</strong>. Review employee leave requests below and take action.
        </p>

        {leaveRequests.length === 0 ? (
          <p style={{ marginTop: '1rem' }}>🎉 No leave requests available at the moment.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Manager</th>
                <th>Decline Reason</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.name} {request.surname}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.reason}</td>
                  <td style={{ color: statusColor(request.status), fontWeight: 'bold' }}>
                    {request.status}
                  </td>
                  <td>{request.managerName || '—'}</td>
                  <td>{request.status === 'Declined' ? request.declineReason : '—'}</td>
                  <td>
                    {request.status === 'Pending' ? (
                      <div style={styles.buttonGroup}>
                        <button
                          style={{ ...styles.button, backgroundColor: '#28a745' }}
                          onClick={() => updateRequestStatus(request.id, 'Approved')}
                        >
                          ✅ Approve
                        </button>
                        <div>
                          <input
                            type="text"
                            placeholder="Reason for decline"
                            value={declineReason[request.id] || ''}
                            onChange={(e) =>
                              setDeclineReason((prev) => ({
                                ...prev,
                                [request.id]: e.target.value
                              }))
                            }
                            style={styles.input}
                          />
                          <button
                            style={{ ...styles.button, backgroundColor: '#dc3545', marginTop: '0.3rem' }}
                            onClick={() =>
                              updateRequestStatus(request.id, 'Declined', declineReason[request.id] || '')
                            }
                          >
                            ❌ Decline
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: '#888' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  heading: {
    color: '#2c3e50',
    fontSize: '1.8rem',
  },
  subtext: {
    color: '#555',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  button: {
    padding: '0.4rem 0.8rem',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.4rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    fontSize: '0.9rem',
    marginTop: '0.3rem',
  },
};

export default ManagerDashboard;


