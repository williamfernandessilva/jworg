import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Mapa from "./pages/Mapa"; 
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública: Acesso livre */}
        <Route path="/" element={<Login />} />

        {/* Rotas Protegidas: Só entra se estiver logado */}
        <Route 
          path="/tutorial" 
          element={
            <PrivateRoute>
              <Tutorial />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/mapa" 
          element={
            <PrivateRoute>
              <Mapa />
            </PrivateRoute>
          } 
        />

        {/* Rota de "Escape": Se o usuário digitar qualquer URL inexistente, 
            ele é mandado para o Login ou Mapa (o PrivateRoute decidirá) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;