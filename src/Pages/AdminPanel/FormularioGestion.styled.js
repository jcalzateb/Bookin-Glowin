import styled from "styled-components";

export const ContenedorFormulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
`;

export const CampoInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
`;

export const BotonAccion = styled.button`
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ agregar }) => (agregar ? "green" : "red")};
  &:hover {
    opacity: 0.8;
  }
`;

export const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 2px dashed white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ImagenMiniatura = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }
`;
