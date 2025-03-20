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
  align-items: center;
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
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
`;

export const CopiarLinkButton = styled(Button)`
  background-color: #00c853;
  color: white;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #00b34d;
  }
`;
