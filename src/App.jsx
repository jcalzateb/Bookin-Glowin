import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import ProductoDetalle from "./Pages/ProductoDetalle";
import AdminPanel from "./Pages/AdminPanel";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;