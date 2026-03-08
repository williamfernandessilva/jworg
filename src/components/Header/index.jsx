import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './styles.css';

function Header() {
  const navigate = useNavigate();
  
  // Buscamos o nome real que foi salvo no localStorage durante o login
  const nomeExibicao = localStorage.getItem('nomeUsuario') || "Usuário";

  const handleLogout = () => {
    // Limpa os dados de sessão para segurança
    localStorage.removeItem('nomeUsuario'); 
    // Opcional: limpe tokens ou outros dados se houver
    navigate('/'); 
  };

  return (
    <header className="main-header">
      <div className="header-content">
        {/* Lado Esquerdo */}
        <div className="logo-section">
          <img src={logoImg} alt="JW.ORG" />
          <span className="logo-text">JW.ORG - Territórios</span>
        </div>

        {/* Lado Direito */}
        <div className="user-section">
          <span className="welcome-text">Olá, <strong>{nomeExibicao}</strong></span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </div>
    </header>
  );
}

export default Header;