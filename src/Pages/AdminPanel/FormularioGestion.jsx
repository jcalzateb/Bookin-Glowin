import React, { useState } from "react";
import {
  ContenedorFormulario,
  CampoInput,
  AreaTexto,
  ContenedorImagenes,
  CajaImagen,
  BotonAgregar,
} from "./FormularioGestion.styled";

const FormularioGestion = ({ agregarServicio }) => {
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    duracion: "",
    descripcion: "",
    imagenes: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagenes = () => {
    const imagenesFalsas = Array(4).fill(
      "https://picsum.photos/200?random=" + Math.random()
    );
    setNuevoServicio({ ...nuevoServicio, imagenes: imagenesFalsas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !nuevoServicio.nombre ||
      !nuevoServicio.categoria ||
      !nuevoServicio.precio ||
      !nuevoServicio.duracion ||
      !nuevoServicio.descripcion
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    agregarServicio(nuevoServicio);

    setNuevoServicio({
      nombre: "",
      categoria: "",
      precio: "",
      duracion: "",
      descripcion: "",
      imagenes: [],
    });
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <CampoInput
        type="text"
        name="nombre"
        value={nuevoServicio.nombre}
        onChange={handleChange}
        placeholder="Servicio"
      />
      <CampoInput
        type="text"
        name="categoria"
        value={nuevoServicio.categoria}
        onChange={handleChange}
        placeholder="Categoría"
      />
      <CampoInput
        type="number"
        name="precio"
        value={nuevoServicio.precio}
        onChange={handleChange}
        placeholder="Precio"
      />
      <CampoInput
        type="number"
        name="duracion"
        value={nuevoServicio.duracion}
        onChange={handleChange}
        placeholder="duracion"
      />
      <AreaTexto
        name="descripcion"
        value={nuevoServicio.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />

      <ContenedorImagenes>
        <p>Añadir imágenes</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {nuevoServicio.imagenes.map((img, index) => (
            <CajaImagen key={index}>
              <img src={img} alt="Miniatura" />
            </CajaImagen>
          ))}
          {nuevoServicio.imagenes.length < 4 && (
            <CajaImagen onClick={handleImagenes}>
              <span>+</span>
            </CajaImagen>
          )}
        </div>
      </ContenedorImagenes>

      <BotonAgregar type="submit">Agregar</BotonAgregar>
    </ContenedorFormulario>
  );
};

export default FormularioGestion;
