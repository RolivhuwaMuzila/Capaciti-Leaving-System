import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const ManagerDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { user } = useContext(AuthContext); // Get manager info

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    setLeaveRequests(requests);
  }, []);

  const updateRequestStatus = (id, newStatus) => {
    const updatedRequests = leaveRequests.map((req) => {
      if (req.id === id) {
        return { 
          ...req, 
          status: newStatus, 
          managerName: `${user.name} ${user.surname}` // record manager name
        };
      }
      return req;
    });
    setLeaveRequests(updatedRequests);
    localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Manager Dashboard</h2>
        {leaveRequests.length === 0 ? (
          <p>No leave requests available.</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.name} {request.surname}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>{request.managerName ? request.managerName : 'N/A'}</td>
                  <td>
                    {request.status === 'Pending' && (
                      <>
                        <button onClick={() => updateRequestStatus(request.id, 'Approved')}>
                          Approve
                        </button>
                        <button onClick={() => updateRequestStatus(request.id, 'Declined')}>
                          Decline
                        </button>
                      </>
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

export default ManagerDashboard;
