import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Header from '../../components/Header';
import L from 'leaflet';

// Importando ícones padrão apenas para backup se necessário


function Mapa() {
  const [bairros, setBairros] = useState([]);
 // const navigate = useNavigate();

  // 1. Definição dos ícones coloridos
  const createIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  // Limites aproximados da cidade de Salto, SP
const limitesSalto = [
  [-23.23544312141311, -47.39043115391712], // Canto Inferior Esquerdo (Sudoeste)
  [-23.159448089846233, -47.25046007098893]  // Nordeste (Northeast)
];

  const icons = {
    verde: createIcon('green'),
    amarelo: createIcon('gold'),
    vermelho: createIcon('red')
  };

  const carregarBairros = async () => {
    try {
      const response = await fetch('http://localhost:5244/api/Bairros');
      if (!response.ok) throw new Error("Erro na rede");
      const data = await response.json();
      setBairros(data);
    } catch (error) {
      console.error("Erro ao carregar (usando dados de teste):", error);
      setBairros([
       
      ]);
    }
  };
const reservarBairro = async (id) => {
    try {
      const response = await fetch(`http://localhost:5244/api/Bairros/Reservar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert("Território reservado com sucesso!");
        carregarBairros(); // Atualiza o mapa para o pin ficar amarelo na hora
      } else {
        const erro = await response.json();
        alert(erro.message || "Não foi possível reservar.");
      }
    } catch (error) {
      console.error("Erro ao reservar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };
  useEffect(() => {
    carregarBairros();
  }, []);

  return (
    <>
      <Header />
      <div className="mapa-page-container">
        <div className="map-wrapper">
          {/* O MapContainer é o pai de tudo que for relacionado ao mapa */}
          <MapContainer 
           center={[-23.2010, -47.2916]} // Centro de Salto
  zoom={14} 
  minZoom={13}                  // Impede de tirar muito o zoom
  maxBounds={limitesSalto}      // Ativa as "paredes" do mapa
  maxBoundsViscosity={1.0}      // Faz as paredes serem "sólidas" (não deixa nem um pouco pra fora)
  scrollWheelZoom={true}
  style={{ height: '100%', width: '100%' }}
>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {/* O loop de bairros deve ficar obrigatoriamente AQUI DENTRO */}
            {bairros.map(bairro => (
              <Marker 
                key={bairro.id} 
                position={[bairro.lat, bairro.lng]}
                icon={icons[bairro.status.toLowerCase()] || icons.verde} 
              >
                <Popup>
                  <div className="popup-content">
      <h3 style={{ color: '#2c3e50' }}>{bairro.nome}</h3>
      <p>Status: <span className={`status-badge ${bairro.status.toLowerCase()}`}>{bairro.status}</span></p>
      
      {/* SE FOR VERDE, MOSTRA BOTÃO DE RESERVAR */}
      {bairro.status.toLowerCase() === 'verde' && (
        <button className="btn-reservar" onClick={() => reservarBairro(bairro.id)}>
          Reservar Bairro
        </button>
      )}

      {/* SE FOR AMARELO OU VERMELHO, APENAS INFORMA */}
      {bairro.status.toLowerCase() === 'amarelo' && (
        <p className="msg-info">⚠️ Já está sendo trabalhado.</p>
      )}

      {bairro.status.toLowerCase() === 'vermelho' && (
        <p className="msg-info">🚫 Bloqueado no momento.</p>
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