import { styled } from "@mui/system";
import { Box, Button, IconButton, TextField } from "@mui/material";

export const ModalContenedor = styled(Box)`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 30px;
  z-index: 999;
`;

export const ModalImagen = styled("img")`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 7px;
`;

export const ModalTitulo = styled("h6")`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const RedesSocialesContenedor = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 15px 0;
`;

export const CopiarLinkButton = styled(Button)`
  background-color: #2d0363;
  font-weight: 500;
  color: white;
  width: 100%;
  &:hover {
    background-color: #530eae;
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.botones.presionado};
  }
`;

export const ContenedorCompartir = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 10px;
`;
