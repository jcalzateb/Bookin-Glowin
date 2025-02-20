import styled from "styled-components";

// Contenedor del formulario
export const ContenedorFormulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;
  background-color: #444;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

// Campos de entrada (inputs)
export const CampoInput = styled.input`
  padding: 14px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #ccc;
  }
`;

// Área de texto (descripción)
export const AreaTexto = styled.textarea`
  padding: 14px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  height: 120px;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: #ccc;
  }
`;

// Contenedor de imágenes
export const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border: 2px dashed white;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

// Contenedor de las miniaturas de imágenes
export const ContenedorMiniaturas = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
`;

// Caja para cada imagen
export const CajaImagen = styled.div`
  width: 175px;
  height: 100px;
  border: 2px dashed white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Icono dentro de las cajas vacías
export const IconoImagen = styled.div`
  color: white;
  opacity: 0.5;
`;

// Botón de agregar
export const BotonAgregar = styled.button`
  padding: 14px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;
