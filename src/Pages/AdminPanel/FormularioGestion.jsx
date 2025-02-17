import React, { useState } from "react";
import {
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  ContenedorImagenes,
  ImagenMiniatura,
} from "./FormularioGestion.styled";

const FormularioGestion = () => {
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [miniaturas, setMiniaturas] = useState([]);

  const handleImagenPrincipal = (e) => {
    const file = e.target.files[0];
    setImagenPrincipal(URL.createObjectURL(file));
  };

  const handleMiniaturas = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setMiniaturas(urls);
  };

  return (
    <ContenedorFormulario>
      <CampoInput type="text" placeholder="Título" />
      <CampoInput type="text" placeholder="Categoría" />
      <CampoInput type="number" placeholder="Precio" />
      <CampoInput type="text" placeholder="Duración" />
      <CampoInput type="text" placeholder="Turnos" />
      <CampoInput type="text" placeholder="Profesional" />
      <textarea placeholder="Descripción"></textarea>

      <ContenedorImagenes>
        <h4>Subir Imagen Principal</h4>
        <input type="file" accept="image/*" onChange={handleImagenPrincipal} />
        {imagenPrincipal && <img src={imagenPrincipal} alt="Principal" width="100" />}
        
        <h4>Subir 4 Miniaturas</h4>
        <input type="file" accept="image/*" multiple onChange={handleMiniaturas} />
        <ImagenMiniatura>
          {miniaturas.map((img, index) => (
            <img key={index} src={img} alt={`Miniatura ${index}`} />
          ))}
        </ImagenMiniatura>
      </ContenedorImagenes>

      <BotonAccion agregar>Agregar</BotonAccion>
      <BotonAccion eliminar>Eliminar</BotonAccion>
    </ContenedorFormulario>
  );
};

export default FormularioGestion;
