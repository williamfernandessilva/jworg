import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const user = localStorage.getItem("nomeUsuario");
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}