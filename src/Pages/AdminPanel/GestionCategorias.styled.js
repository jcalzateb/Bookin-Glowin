import styled from "styled-components";

export const ContenedorGestionCategorias = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  min-height: 500px;
`;

// Sección izquierda - Formulario de agregar categoría
export const SeccionRegistro = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Sección derecha - Lista de categorías
export const SeccionLista = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #555;
  border-radius: 10px;
  text-align: center;
`;

export const CampoInput = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid white;
  border-radius: 5px;
  background: transparent;
  color: white;
  font-size: 16px;
  text-align: center;

  &::placeholder {
    color: #ccc;
  }
`;

export const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

// (Agregar / Actualizar)
export const BotonAccion = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => color || "#28a745"};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: ${({ color }) =>
      color === "#6c757d" ? "#5a6268" : "#218838"};
  }
`;

export const ListaCategorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
`;

export const CategoriaItem = styled.div`
  width: 180px;
  padding: 10px;
  background-color: #666;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

export const ImagenCategoria = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 2px solid white;
`;

export const BotonEliminar = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  width: 90%;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

export const BotonEditar = styled.button`
  background-color: #ffc107;
  color: black;
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  width: 90%;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #e0a800;
  }
`;
