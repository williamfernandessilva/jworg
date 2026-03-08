import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import './styles.css';

function Header() {
  const navigate = useNavigate();
  // Pegamos o nome do usuário que salvamos no login (opcional por enquanto)
  const nomeUsuario = localStorage.getItem('usuarioNome') || "Irmão";

  const handleLogout = () => {
    localStorage.removeItem('usuarioNome'); // Limpa os dados
    navigate('/'); // Volta para o login
  };

  return (
    <header className="main-header">
    <div className="header-content">
  {/* Lado Esquerdo */}
  <div className="logo-section">
    <img src={logoImg} alt="JW.ORG" />
    <span>JW.ORG - Territórios</span>
  </div>

  {/* Lado Direito */}
  <div className="user-section">
    <p>Olá, <strong>{nomeUsuario}</strong></p>
    <button onClick={handleLogout} className="btn-logout">Sair</button>
  </div>
</div>
    </header>
  );
}

export default Header;