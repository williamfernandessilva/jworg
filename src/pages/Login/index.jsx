import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook de navegação
import './styles.css';
import logoImg from "../../assets/logo.png"; // Ajustado para subir as pastas corretamente

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // 2. Inicialize o navigate

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5244/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }) // Verifique se os nomes batem com seu estado
    });

    const data = await response.json();

    if (response.ok) {
      // SALVANDO AS INFORMAÇÕES NO NAVEGADOR
      localStorage.setItem("nomeUsuario", data.nome);
      localStorage.setItem("isAdmin", data.isAdmin); // Agora salvamos o nível de acesso
      
      alert("Bem-vindo, " + data.nome);
      navigate('/Mapa');
    } else {
      alert(data.message || "Erro ao logar");
    }

  } catch (error) {
    // O "CATCH" QUE ESTAVA FALTANDO
    console.error("Erro na conexão:", error);
    alert("O servidor está desligado ou houve um erro de rede.");
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