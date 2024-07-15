import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode; // Children can be any valid JSX
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
