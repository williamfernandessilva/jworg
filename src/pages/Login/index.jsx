import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logoImg from "../../assets/logo.png";

// 1. Defina a URL do Render aqui no topo
const API_URL = "https://jworg-api-1.onrender.com/api";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 2. Trocamos o localhost pela API do Render e corrigimos o caminho (endpoint)
      // Certifique-se que no C# o seu login é "api/usuarios/login"
      const response = await fetch(`${API_URL}/auth/login`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }) 
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("nomeUsuario", data.nome);
        localStorage.setItem("isAdmin", data.isAdmin);
        
        alert("Bem-vindo, " + data.nome);
        navigate('/Mapa');
      } else {
        alert(data.message || "E-mail ou senha incorretos.");
      }

    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor no Render.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <img src={logoImg} alt="JW.ORG" className="logo" />
        <h1>JW . ORG</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input className='email'
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input className='senha'
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-entrar">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;