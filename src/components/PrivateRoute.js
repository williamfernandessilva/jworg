import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  // Verificamos se o usuário passou pelo login com sucesso
  const usuarioLogado = localStorage.getItem("nomeUsuario");

  // Se NÃO existir o nome no localStorage, mandamos ele de volta para a tela "/" (Login)
  if (!usuarioLogado) {
    return <Navigate to="/" />;
  }

  // Se existir, deixamos ele ver o que está dentro (o Mapa)
  return children;
};