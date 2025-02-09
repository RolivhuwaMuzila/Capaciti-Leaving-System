import React, { useState, useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

const RequestLeave = () => {
  const { user } = useContext(AuthContext);
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [reason, setReason] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve existing leave requests from localStorage
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
      status: 'Pending'
    };
    leaveRequests.push(newRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    setMessage('Leave request submitted successfully!');
    // Reset form fields
    setLeaveType('Sick Leave');
    setReason('');
    setDateFrom('');
    setDateUntil('');
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Request Leave</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <p>
            <strong>Name:</strong> {user.name} {user.surname}
          </p>
          <label>
            Leave Type:
            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Family Leave">Family Leave</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Date From:
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Date Until:
            <input
              type="date"
              value={dateUntil}
              onChange={(e) => setDateUntil(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Reason:
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Submit Leave Request</button>
        </form>
      </div>
    </div>
  );
};

export default RequestLeave;
