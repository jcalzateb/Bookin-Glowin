import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";

const ModalContainer = styled(Box)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px !important;
  width: 100%;
  max-width: 400px;
  height: 300px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 20px;
`;

const Contenedor1 = styled(Box)`
  gap: 20px;
`;
const Contenedor2 = styled(Box)``;

const ModalTitle = styled(DialogTitle)`
  font-size: 24px !important;
  font-weight: 600 !important;
  padding: 0 !important;
  color: #2d0363;
  margin-bottom: 2px !important;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.h1.fontFamily}!important;
`;

const ModalButton = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  text-transform: none !important;
  padding: 10px 20px !important;
  margin: 0 10px !important;
  border-radius: 6px !important;
  font-weight: bold !important;
  align-items: center !important;
  width: 100%;
  &:hover {
    background-color: #530eae !important;
  }
`;

const CerrarSesionModal = ({ abierto, cerrar, confirmarCerrarSesion }) => {
  return (
    <Dialog
      open={abierto}
      onClose={cerrar}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
        },
      }}
    >
      <ModalContainer>
        <Contenedor1>
          <IconButton
            sx={{ color: "#2d0363", fontSize: 60, padding: " 10px !important" }}
            aria-label="Auth"
            disabled
          >
            <LogoutIcon
              sx={{
                fontSize: "50px",
                padding: " 0 !important",
                color: "#2d0363",
              }}
            />
          </IconButton>
          <ModalTitle>¿Estás seguro de que quieres cerrar sesión?</ModalTitle>
        </Contenedor1>
        <Contenedor2>
          <DialogActions>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ModalButton onClick={confirmarCerrarSesion}>
                Confirmar
              </ModalButton>
              <ModalButton onClick={cerrar}>Cancelar</ModalButton>
            </Box>
          </DialogActions>
        </Contenedor2>
      </ModalContainer>
    </Dialog>
  );
};

export default CerrarSesionModal;
