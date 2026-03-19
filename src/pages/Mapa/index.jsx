import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Header from '../../components/Header';
import L from 'leaflet';

function Mapa() {
  const API_URL = "https://jworg-api-1.onrender.com/api/bairros";
  const [bairros, setBairros] = useState([]);
  const [novoBairro, setNovoBairro] = useState({ nome: '', lat: '', lng: '' });
  const usuarioLogado = localStorage.getItem("nomeUsuario");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const createIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const limitesSalto = [
    [-23.23544312141311, -47.39043115391712],
    [-23.159448089846233, -47.25046007098893]
  ];

  const icons = {
    verde: createIcon('green'),
    amarelo: createIcon('gold'),
    vermelho: createIcon('red')
  };

  const carregarBairros = async () => {
    try {
      const response = await fetch('https://jworg-api-1.onrender.com/api/bairros');
      if (!response.ok) throw new Error("Erro na rede");
      const data = await response.json();
      setBairros(data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  const handleCadastrar = async () => {
    if (!novoBairro.nome || !novoBairro.lat || !novoBairro.lng) {
      alert("Preencha todos os campos para adicionar um pin.");
      return;
    }

    try {
      const response = await fetch('https://jworg-api-1.onrender.com/api/bairros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: novoBairro.nome,
          lat: parseFloat(novoBairro.lat),
          lng: parseFloat(novoBairro.lng),
          status: "verde"
        })
      });

      if (response.ok) {
        alert("Novo território cadastrado!");
        setNovoBairro({ nome: '', lat: '', lng: '' });
        carregarBairros();
      } else {
        alert("Erro ao cadastrar bairro.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // FUNÇÃO EXCLUIR (Adicionada dentro do componente)
  const excluirBairro = async (id) => {

    
    if (!window.confirm("Tem certeza que deseja excluir este ponto permanentemente?")) return;

    try {
      const response = await fetch(`https://jworg-api-1.onrender.com/api/bairros/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert("Ponto removido com sucesso!");
        carregarBairros();
      } else {
        alert("Erro ao excluir o ponto.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const reservarBairro = async (id) => {
    if (!usuarioLogado) {
      alert("Erro: Faça login novamente.");
      return;
    }
    try {
      const response = await fetch(`https://jworg-api-1.onrender.com/api/bairros/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioLogado)
      });
      if (response.ok) {
        alert("Território reservado!");
        carregarBairros();
      }
    } catch (error) {
      console.error("Erro ao reservar:", error);
    }
  };

  const concluirBairro = async (id) => {
    if (!window.confirm("Deseja marcar como concluído?")) return;
    try {
      const response = await fetch(`https://jworg-api-1.onrender.com/api/bairros/Concluir/${id}`, {
        method: 'PUT'
      });
      if (response.ok) {
        alert("Trabalho finalizado!");
        carregarBairros();
      }
    } catch (error) {
      console.error("Erro ao concluir:", error);
    }
  };

  useEffect(() => {
    carregarBairros();
  }, []);

  return (
    <>
      <Header />
      <div className="mapa-page-container">
        <div className="map-legend">
          <h4>Legenda</h4>
          <div className="legend-item"><span className="dot verde"></span><p><strong>Disponível</strong></p></div>
          <div className="legend-item"><span className="dot amarelo"></span><p><strong>Em progresso</strong></p></div>
          <div className="legend-item"><span className="dot vermelho"></span><p><strong>Concluído</strong></p></div>
          
          {isAdmin && (
            <div className="admin-panel">
              <hr />
              <h4>Novo Ponto</h4>
              <input 
                type="text" 
                placeholder="Nome do Bairro" 
                value={novoBairro.nome}
                onChange={(e) => setNovoBairro({...novoBairro, nome: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Latitude" 
                value={novoBairro.lat}
                onChange={(e) => setNovoBairro({...novoBairro, lat: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Longitude" 
                value={novoBairro.lng}
                onChange={(e) => setNovoBairro({...novoBairro, lng: e.target.value})}
              />
              <button onClick={handleCadastrar} className="btn-admin">Adicionar</button>
            </div>
          )}
        </div>

        <div className="map-wrapper">
          <MapContainer 
            center={[-23.2010, -47.2916]} 
            zoom={14} 
            minZoom={13}
            maxBounds={limitesSalto}
            maxBoundsViscosity={1.0}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {bairros.map(bairro => (
              <Marker
                key={bairro.id}
                position={[bairro.lat, bairro.lng]}
                icon={icons[bairro.status.toLowerCase()] || icons.verde}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>{bairro.nome}</h3>
                    <p>Status: <strong className={bairro.status.toLowerCase()}>{bairro.status}</strong></p>

                    {bairro.status.toLowerCase() === 'verde' && (
                      <button className="btn-reservar" onClick={() => reservarBairro(bairro.id)}>Reservar Bairro</button>
                    )}

                    {bairro.status.toLowerCase() === 'amarelo' && (
                      <div className="info-reserva">
                        <p>⚠️ Com: <strong>{bairro.trabalhadoPor}</strong></p>
                        {bairro.trabalhadoPor === usuarioLogado && (
                          <button className="btn-concluir" onClick={() => concluirBairro(bairro.id)}>Finalizar</button>
                        )}
                      </div>
                    )}

                    {bairro.status.toLowerCase() === 'vermelho' && (
                      <div className="info-concluido">
                        <p>✅ Por: <strong>{bairro.trabalhadoPor}</strong></p>
                        {bairro.dataConclusao && (
                          <p className="data-info">📅 {new Date(bairro.dataConclusao).toLocaleDateString('pt-BR')}</p>
                        )}
                      </div>
                    )}

                    {/* BOTÃO EXCLUIR PARA ADMIN */}
                    {isAdmin && (
                      <button 
                        className="btn-excluir" 
                        onClick={() => excluirBairro(bairro.id)}
                        style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px', marginTop: '10px', width: '100%', borderRadius: '4px', cursor: 'pointer' }}
                      >
                Excluir
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default Mapa;