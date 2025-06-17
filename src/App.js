import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // ✅ Fixed: Correct name
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
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/request-leave" element={user ? <RequestLeave /> : <Navigate to="/login" />} />
        <Route
          path="/manager-dashboard"
          element={user && user.role === 'Manager' ? <ManagerDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/leave-status" element={user ? <LeaveStatus /> : <Navigate to="/login" />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
