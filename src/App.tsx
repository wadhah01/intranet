import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import EmployeeDashboard from './pages/employee/Dashboard';
import LeaveRequests from './pages/employee/LeaveRequests';
import Team from './pages/employee/Team';
import Messages from './pages/employee/Messages';
import CashAdvance from './pages/employee/CashAdvance';
import ManageLeave from './pages/supervisor/ManageLeave';
import ProtectedRoute from './components/common/ProtectedRoute';
import { UserRole } from './types';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<Layout />}>
              {/* Routes communes */}
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              
              {/* Routes employé */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/team"
                element={
                  <ProtectedRoute>
                    <Team />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/leave-requests"
                element={
                  <ProtectedRoute>
                    <LeaveRequests />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/cash-advance"
                element={
                  <ProtectedRoute>
                    <CashAdvance />
                  </ProtectedRoute>
                }
              />
              
              {/* Routes superviseur */}
              <Route
                path="/manage-leave"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.SUPERVISOR]}>
                    <ManageLeave />
                  </ProtectedRoute>
                }
              />
              
              {/* Route par défaut */}
              <Route path="*" element={<Navigate replace to="/dashboard" />} />
            </Route>
          </Routes>
        </Router>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #e2e8f0',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          }}
        />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;