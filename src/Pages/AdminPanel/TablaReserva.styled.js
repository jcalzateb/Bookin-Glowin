import styled from "styled-components";

export const ContenedorTablaReservas = styled.div`
  padding: 20px;
  background-color: #333;
  color: white;
  border-radius: 10px;
`;

export const SeccionLista = styled.div`
  text-align: center;
`;

export const TablaReservasEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: #444;
  border-radius: 8px;
  overflow: hidden;
`;

export const EncabezadoTabla = styled.thead`
  background-color: #9747ff;
  color: white;
`;

export const CuerpoTabla = styled.tbody`
  background: #444;
  color: white;
`;

export const FilaTabla = styled.tr`
  &:nth-child(even) {
    background-color: #555;
  }
`;

export const CeldaEncabezado = styled.th`
  padding: 12px;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px solid #ddd;
`;

export const Celda = styled.td`
  padding: 12px;
  border-bottom: 1px solid #666;
`;

export const SelectRol = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: none;
  background: #666;
  color: white;
  cursor: pointer;

  &:disabled {
    background: #444;
    color: #aaa;
    cursor: not-allowed;
  }
`;

export const BotonEliminar = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;
