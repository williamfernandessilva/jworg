import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const usuarioLogado = localStorage.getItem("nomeUsuario");

  // Se não houver usuário, redireciona para o login
  if (!usuarioLogado) {
    return <Navigate to="/" />;
  }

  // Se houver, renderiza os filhos (Mapa ou Tutorial)
  return children;
};

export { PrivateRoute };