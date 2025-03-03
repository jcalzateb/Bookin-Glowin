import styled from "styled-components";

export const ContenedorTabla = styled.div`
  padding: 20px 10px;
  overflow-x: auto;
`;

export const TituloSeccion = styled.h2`
  text-align: center;
  font-size: 30px;
  color: white;
  margin-bottom: 15px;
`;

export const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #f8f8f8;
  border-radius: 10px;
  overflow: hidden;
  color: #333;
`;

export const Encabezado = styled.thead`
  background-color: #9747ff;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const FilaEncabezado = styled.tr`
  text-align: center;
`;

export const CeldaEncabezado = styled.th`
  padding: 12px;
  border-bottom: 2px solid #ddd;
`;

export const CuerpoTabla = styled.tbody`
  background: #444;
  color: white;
  text-align: center;
`;

export const Fila = styled.tr`
  &:nth-child(even) {
    background-color: #555;
  }
`;

export const Celda = styled.td`
  padding: 10px;
  border-bottom: 1px solid #666;
`;

export const IconosAccion = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  background-color: rgba(151, 71, 255, 0.16);
  border-radius: 10px;

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: rgb(151, 71, 255);
    }
  }
`;
