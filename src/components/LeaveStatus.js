import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const LeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [myLeaves, setMyLeaves] = useState([]);
  const [selectedReason, setSelectedReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const leaveAllocations = {
    "Sick Leave": 20,
    "Study Leave": 5,
    "Family Responsibility": 5,
    "Annual Leave": 20,
    "Unpaid Leave": null,
  };

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    const filtered = requests.filter(req => req.username === user.username);
    setMyLeaves(filtered);
  }, [user.username]);

  const calculateDays = (from, until) => {
    const fromDate = new Date(from);
    const untilDate = new Date(until);
    const timeDiff = untilDate.getTime() - fromDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const getRemainingForType = (type) => {
    const total = leaveAllocations[type];
    if (total === null) return 'Unlimited';

    const approvedLeaves = myLeaves.filter(
      (req) => req.leaveType === type && req.status.toLowerCase() === 'approved'
    );

    const usedDays = approvedLeaves.reduce((sum, req) => {
      return sum + calculateDays(req.dateFrom, req.dateUntil);
    }, 0);

    return `${Math.max(total - usedDays, 0)} days left`;
  };

  const openModal = (reason) => {
    setSelectedReason(reason || 'No reason provided');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReason('');
  };

  return (
    <div style={styles.pageWrapper}>
      <NavBar />
      <div style={styles.container}>
        <h2 style={styles.title}>📋 My Leave Requests</h2>

        {myLeaves.length === 0 ? (
          <div style={styles.noDataContainer}>
            <p style={styles.noData}>🚫 No leave requests submitted yet.</p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.th}>📌 Type</th>
                  <th style={styles.th}>📅 From</th>
                  <th style={styles.th}>📅 Until</th>
                  <th style={styles.th}>📝 Reason</th>
                  <th style={styles.th}>⏳ Status</th>
                  <th style={styles.th}>👨‍💼 Manager</th>
                  <th style={styles.th}>📊 Balance Left</th>
                  <th style={styles.th}>❌ Decline Reason</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.map((req, index) => (
                  <tr key={req.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td style={styles.td}>{req.leaveType}</td>
                    <td style={styles.td}>{req.dateFrom}</td>
                    <td style={styles.td}>{req.dateUntil}</td>
                    <td style={styles.td}>{req.reason}</td>
                    <td style={{ ...styles.td, color: getStatusColor(req.status), fontWeight: 'bold' }}>
                      {req.status}
                    </td>
                    <td style={styles.td}>{req.managerName || 'Pending Assignment'}</td>
                    <td style={styles.td}>
                      {req.status.toLowerCase() === 'approved' && leaveAllocations[req.leaveType] !== null
                        ? getRemainingForType(req.leaveType)
                        : leaveAllocations[req.leaveType] === null
                          ? 'Unlimited'
                          : '--'}
                    </td>
                    <td style={styles.td}>
                      {req.status.toLowerCase() === 'declined' ? (
                        <button style={styles.viewButton} onClick={() => openModal(req.declineReason)}>
                          View Reason
                        </button>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Decline Reason</h3>
            <p style={styles.modalText}>{selectedReason}</p>
            <button onClick={closeModal} style={styles.modalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return '#28a745';
    case 'declined':
      return '#dc143c';
    case 'pending':
    default:
      return '#ff8c00';
  }
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    paddingBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(220, 20, 60, 0.1)',
    border: '1px solid rgba(220, 20, 60, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#dc143c',
    fontSize: '2rem',
    fontWeight: '600',
    textShadow: '0 2px 4px rgba(220, 20, 60, 0.1)',
  },
  noDataContainer: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '2px dashed rgba(220, 20, 60, 0.2)',
  },
  noData: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    margin: 0,
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(220, 20, 60, 0.05)',
    border: '1px solid rgba(220, 20, 60, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    backgroundColor: '#ffffff',
  },
  headerRow: {
    backgroundColor: '#dc143c',
  },
  th: {
    backgroundColor: '#dc143c',
    color: '#ffffff',
    padding: '16px 12px',
    fontWeight: '600',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#fafafa',
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid rgba(220, 20, 60, 0.1)',
    color: '#333',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease',
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: '#dc143c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#dc143c',
  },
  modalText: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#444',
  },
  modalClose: {
    padding: '8px 16px',
    backgroundColor: '#dc143c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default LeaveStatus;
