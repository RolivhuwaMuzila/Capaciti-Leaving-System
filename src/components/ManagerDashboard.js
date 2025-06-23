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
      case 'Approved': return '#DC143C';
      case 'Declined': return '#8B0000';
      case 'Pending':
      default: return '#B22222';
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Manager Dashboard</h2>
        <p style={styles.subtext}>
          Welcome, <strong>{user.name} {user.surname}</strong>. Review employee leave requests below and take action.
        </p>

        {leaveRequests.length === 0 ? (
          <div style={styles.noRequestsContainer}>
            <p style={styles.noRequestsText}>🎉 No leave requests available at the moment.</p>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.headerCell}>Employee</th>
                  <th style={styles.headerCell}>Leave Type</th>
                  <th style={styles.headerCell}>Reason</th>
                  <th style={styles.headerCell}>Status</th>
                  <th style={styles.headerCell}>Manager</th>
                  <th style={styles.headerCell}>Decline Reason</th>
                  <th style={styles.headerCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr key={request.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.cell}>{request.name} {request.surname}</td>
                    <td style={styles.cell}>{request.leaveType}</td>
                    <td style={styles.cell}>{request.reason}</td>
                    <td style={{ ...styles.cell, color: statusColor(request.status), fontWeight: 'bold' }}>
                      {request.status}
                    </td>
                    <td style={styles.cell}>{request.managerName || '—'}</td>
                    <td style={styles.cell}>{request.status === 'Declined' ? request.declineReason : '—'}</td>
                    <td style={styles.cell}>
                      {request.status === 'Pending' ? (
                        <div style={styles.buttonGroup}>
                          <button
                            style={styles.approveButton}
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
                              style={styles.declineButton}
                              onClick={() =>
                                updateRequestStatus(request.id, 'Declined', declineReason[request.id] || '')
                              }
                            >
                              ❌ Decline
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#DC143C' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: '2rem',
    backgroundColor: '#FFFFFF',
    minHeight: 'calc(100vh - 80px)',
  },
  heading: {
    color: '#DC143C',
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textShadow: '1px 1px 2px rgba(220, 20, 60, 0.1)',
  },
  subtext: {
    color: '#8B0000',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    padding: '1rem',
    backgroundColor: '#FFF8F8',
    border: '1px solid #FFE4E1',
    borderRadius: '8px',
  },
  noRequestsContainer: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#FFF8F8',
    borderRadius: '12px',
    border: '2px solid #FFE4E1',
  },
  noRequestsText: {
    fontSize: '1.2rem',
    color: '#DC143C',
    fontWeight: '500',
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(220, 20, 60, 0.1)',
    border: '2px solid #FFE4E1',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    backgroundColor: '#DC143C',
  },
  headerCell: {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #B22222',
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#FFF8F8',
  },
  cell: {
    padding: '1rem',
    borderBottom: '1px solid #FFE4E1',
    color: '#8B0000',
    fontSize: '0.9rem',
    verticalAlign: 'top',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: '180px',
  },
  approveButton: {
    padding: '0.6rem 1rem',
    color: '#FFFFFF',
    backgroundColor: '#DC143C',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(220, 20, 60, 0.2)',
  },
  declineButton: {
    padding: '0.6rem 1rem',
    color: '#FFFFFF',
    backgroundColor: '#8B0000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginTop: '0.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(139, 0, 0, 0.2)',
  },
  input: {
    padding: '0.6rem',
    border: '2px solid #FFE4E1',
    borderRadius: '6px',
    width: '100%',
    fontSize: '0.9rem',
    backgroundColor: '#FFFFFF',
    color: '#8B0000',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
};

export default ManagerDashboard;