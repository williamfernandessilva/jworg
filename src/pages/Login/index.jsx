import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logoImg from "../../assets/logo.png";

// 1. Defina a URL do Render aqui (certifique-se de que não há barra / no final de 'api')
const API_URL = "https://jworg-api-1.onrender.com/api";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 2. Enviando apenas e-mail e senha para evitar erro 400 de validação no C#
      const response = await fetch(`${API_URL}/auth/login`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha }) 
      });

      // 3. Verifica se a resposta foi sucesso antes de tentar transformar em JSON
      if (response.ok) {
        const data = await response.json();
        
        // Salva os dados no localStorage
        localStorage.setItem("nomeUsuario", data.nome);
        localStorage.setItem("isAdmin", data.isAdmin);
        
        alert("Bem-vindo, " + data.nome);
        navigate('/mapa'); // Verifique se no seu App.js a rota é '/mapa' ou '/Mapa'
      } else {
        // Se cair aqui, o servidor respondeu (400, 401, 500 etc)
        const errorData = await response.json().catch(() => ({ message: "Erro de autenticação" }));
        alert(errorData.message || "E-mail ou senha incorretos.");
      }

    } catch (error) {
      // Se cair aqui, a conexão nem chegou no servidor (CORS ou URL errada)
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor no Render. Verifique sua internet ou se a API está acordada.");
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