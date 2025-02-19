import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import ProductoDetalle from "./Pages/ProductoDetalle/ProductoDetalle";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

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
