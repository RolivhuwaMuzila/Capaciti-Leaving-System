import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const LeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [myLeaves, setMyLeaves] = useState([]);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    // Filter requests for the current user
    const filtered = requests.filter(req => req.username === user.username);
    setMyLeaves(filtered);
  }, [user.username]);

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Leave Pending</h2>
        {myLeaves.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Date From</th>
                <th>Date Until</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {myLeaves.map((req) => (
                <tr key={req.id}>
                  <td>{req.leaveType}</td>
                  <td>{req.dateFrom}</td>
                  <td>{req.dateUntil}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>{req.managerName ? req.managerName : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveStatus;
