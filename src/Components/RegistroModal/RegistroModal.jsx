import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import styled from "styled-components";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const ModalContainer = styled(Box)`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px !important;
  width: 100%;
  max-width: 400px;
  height: 350px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Contenedor1 = styled(Box)``;
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

const ModalText = styled(Typography)`
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #2d0363;
  margin-bottom: 16px;
`;

const ModalButton = styled(Button)`
  background-color: #2d0363 !important;
  color: white !important;
  text-transform: none !important;
  padding: 10px 20px !important;
  border-radius: 6px !important;
  font-weight: bold !important;
  align-items: center !important;
  width: 100%;
  &:hover {
    background-color: #530eae !important;
  }
`;

const EnlaceReenviar = styled(Typography)`
  color: ${({ theme }) => theme.palette.detalle.main};
  cursor: pointer;
  text-decoration: underline;
  margin: 3px !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  font-family: ${({ theme }) => theme.typography.button.fontFamily}!important;
  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.palette.botones.hovered} !important;
  }
`;

const RegistroModal = ({
  open,
  onClose,
  onReenviarCorreo,
  email,
  mensajeModal,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
        },
      }}
    >
      <ModalContainer>
        <Contenedor1>
          <IconButton
            sx={{ color: "#2d0363", fontSize: 60, padding: " 0 !important" }}
            aria-label="Correo"
            disabled
          >
            <MailOutlineIcon
              sx={{
                fontSize: "50px",
                padding: " 0 !important",
                color: "#2d0363",
              }}
            />
          </IconButton>
          <ModalTitle>Gracias por registrarte</ModalTitle>
        </Contenedor1>
        <Contenedor2>
          <Typography
            variant="body2"
            sx={{ fontWeight: "400", color: "#2d0363" }}
          >
            Correo de confirmación enviado a: {email}
          </Typography>
          <EnlaceReenviar onClick={onReenviarCorreo}>
            Reenviar confirmación
          </EnlaceReenviar>
        </Contenedor2>
        <ModalText>{mensajeModal}</ModalText>

        <DialogActions>
          <ModalButton onClick={onClose}>Confirmar registro</ModalButton>
        </DialogActions>
      </ModalContainer>
    </Dialog>
  );
};

export default RegistroModal;
