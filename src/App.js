import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import RequestLeave from './components/RequestLeave';
import ManagerDashboard from './components/ManagerDashboard';
import LeaveStatus from './components/LeaveStatus';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/request-leave" element={user ? <RequestLeave /> : <Navigate to="/login" />} />
        <Route
          path="/manager-dashboard"
          element={user && user.role === 'Manager' ? <ManagerDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/leave-status" element={user ? <LeaveStatus /> : <Navigate to="/login" />} />
        {/* Catch-all: redirect to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
