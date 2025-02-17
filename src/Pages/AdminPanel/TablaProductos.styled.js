import styled from "styled-components";

export const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #555;
  color: white;
  border-radius: 10px; /* Bordes redondeados */

  th, td {
    padding: 10px;
    border: 1px solid white;
    text-align: center;
  }

  th {
    background-color: #222;
  }
`;

export const BotonAccion = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ editar }) => (editar ? "yellow" : "red")};
  &:hover {
    opacity: 0.8;
  }
`;
