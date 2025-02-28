import styled from "styled-components";

export const ContenedorFormulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: #444;
  border-radius: 10px;
  width: 100%;
  max-width: 900px;
  min-width: 600px;
  margin: auto;
`;

export const Etiqueta = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
`;

export const CampoInput = styled.input`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #9747ff;
  }
`;

export const AreaTexto = styled.textarea`
  padding: 12px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  height: 100px;
  resize: none;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #9747ff;
  }
`;

export const CampoSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: 16px;
  width: 100%;
  cursor: pointer;

  option {
    background: #444;
    color: white;
  }

  &::placeholder {
    color: #ccc;
  }
`;

// Contenedor de las imágenes
export const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 2px dashed white;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
`;

// Caja de imágenes
export const CajaImagen = styled.div`
  width: 80px;
  height: 80px;
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

// Botones de acción
export const BotonAccion = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => color || "#28a745"};
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

// Contenedor de botones en fila
export const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;
