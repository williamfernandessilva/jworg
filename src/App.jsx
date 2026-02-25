import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// Se não for usar o logo no App.jsx, REMOVA a linha do import da imagem aqui.
// Deixe o logo apenas dentro do Login/index.jsx.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h1>tutorial</h1>} />
      </Routes>
    </Router>
  );
}

export default App;