import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Mapa from "./pages/Mapa"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
}

export default App;