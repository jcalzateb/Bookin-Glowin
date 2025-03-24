import styled from "styled-components";

export const ContenedorGestionEmpleados = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  min-height: 500px;
`;

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

export const ListaEmpleados = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
`;

export const EmpleadoItem = styled.div`
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

export const CeldaEmpleado = styled.span`
  padding: 5px;
`;
