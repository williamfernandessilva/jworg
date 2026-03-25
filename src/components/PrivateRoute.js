import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const usuarioLogado = localStorage.getItem("nomeUsuario");

  if (!usuarioLogado) {
    return <Navigate to="/" />;
  }

  return children;
}