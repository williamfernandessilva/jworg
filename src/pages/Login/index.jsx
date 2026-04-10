import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logoImg from "../../assets/logo.png";

const API_URL = "https://jworg-api-1.onrender.com/api";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha }) 
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("nomeUsuario", data.nome);
        localStorage.setItem("isAdmin", data.isAdmin);
        
        alert("Bem-vindo, " + data.nome);
        navigate('/mapa');
      } else {
        const errorData = await response.json().catch(() => ({ message: "E-mail ou senha incorretos." }));
        alert(errorData.message || "E-mail ou senha incorretos.");
      }

    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("A API no Render está acordando. Por favor, aguarde alguns segundos e tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logoImg} alt="JW.ORG" className="logo" />
        <h1>JW . ORG</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              className='email'
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              className='senha'
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>
          
          {}
          <button 
            type="submit" 
            className="btn-entrar" 
            disabled={carregando}
            style={{ opacity: carregando ? 0.7 : 1, cursor: carregando ? 'not-allowed' : 'pointer' }}
          >
            {carregando ? "Conectando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;