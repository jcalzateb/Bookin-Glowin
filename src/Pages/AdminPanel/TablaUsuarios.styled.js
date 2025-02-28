import styled from "styled-components";

// Contenedor principal de la tabla de usuarios
export const ContenedorTablaUsuarios = styled.div`
  padding: 20px;
  background-color: #333;
  color: white;
  border-radius: 10px;
`;

// Sección donde se ubica la tabla
export const SeccionLista = styled.div`
  text-align: center;
`;

// Estilos para la tabla
export const TablaUsuariosEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: #444;
  border-radius: 8px;
  overflow: hidden;
`;

// Encabezado de la tabla
export const EncabezadoTabla = styled.thead`
  background-color: #9747ff;
  color: white;
`;

// Cuerpo de la tabla (Agregado para solucionar el error)
export const CuerpoTabla = styled.tbody`
  background: #444;
  color: white;
`;

// Fila de la tabla
export const FilaTabla = styled.tr`
  &:nth-child(even) {
    background-color: #555;
  }
`;

// Celda de encabezado
export const CeldaEncabezado = styled.th`
  padding: 12px;
  text-align: center;
  font-size: 16px;
`;

// Celda de datos
export const Celda = styled.td`
  padding: 12px;
  border-bottom: 1px solid #666;
`;

// Selector de roles
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

// Botón de eliminar
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
