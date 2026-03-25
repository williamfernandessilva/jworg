import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Mapa from "./pages/Mapa"; 
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;