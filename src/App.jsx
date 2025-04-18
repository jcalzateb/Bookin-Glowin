import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import ProductoDetalle from "./Pages/ProductoDetalle/ProductoDetalle";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Registro from "./Pages/Registro/Registro";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Reserva from "./Pages/Reserva/Reserva";
import ReservaConfirmada from "./Pages/Reserva/ReservaConfirmada";
import HistorialReservas from "./Pages/HistorialReservas/HistorialReservas";

const App = () => {
  const [mostrarHeader, setMostrarHeader] = useState(true);

  return (
    <Router>
      <AuthProvider>
        {mostrarHeader && <Header />}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/producto/:id"
            element={<ProductoDetalle setMostrarHeader={setMostrarHeader} />}
          />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/reserva-confirmada" element={<ReservaConfirmada />} />
          <Route path="/historial" element={<HistorialReservas />} />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminPanel />} />}
          />
          <Route path="/registrar" element={<Registro />} />
          <Route path="/ingresar" element={<Login />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
