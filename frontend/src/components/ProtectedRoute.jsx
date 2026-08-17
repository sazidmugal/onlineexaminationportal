import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role') || '';

  // 1. Not logged in -> send to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Normalize roles to avoid casing issues
  const currentRoleUpper = userRole.toUpperCase();
  const allowedRoleUpper = (allowedRole || '').toUpperCase();

  // Check if role matches (handles both 'ROLE_ADMIN' and 'ADMIN')
  const hasPermission =
    currentRoleUpper === allowedRoleUpper ||
    currentRoleUpper.includes(allowedRoleUpper.replace('ROLE_', '')) ||
    allowedRoleUpper.includes(currentRoleUpper.replace('ROLE_', ''));

  // 2. Access denied -> force redirect strictly based on stored role
  if (!hasPermission) {
    const isAdmin = currentRoleUpper.includes('ADMIN');
    return <Navigate to={isAdmin ? '/admin-dashboard' : '/user-dashboard'} replace />;
  }

  // 3. Authorized -> render content
  return <Outlet />;
};

export default ProtectedRoute;