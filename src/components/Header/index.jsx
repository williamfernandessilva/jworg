import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './styles.css';

function Header() {
  const API_URL = "https://jworg-api-1.onrender.com/api/Bairros";
  const navigate = useNavigate();
  
  
  const nomeExibicao = localStorage.getItem('nomeUsuario') || "Usuário";

  const handleLogout = () => {
    
    localStorage.removeItem('nomeUsuario'); 
   
    navigate('/'); 
  };

  return (
    <header className="main-header">
      <div className="header-content">
        {}
        <div className="logo-section">
          <img src={logoImg} alt="JW.ORG" />
          <span className="logo-text">JW.ORG - Territórios</span>
        </div>

        {}
        <div className="user-section">
          <span className="welcome-text">Olá, <strong>{nomeExibicao}</strong></span>
          <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
      </div>
    </header>
  );
}

export default Header;