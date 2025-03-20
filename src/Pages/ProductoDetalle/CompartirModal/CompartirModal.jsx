import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, WhatsApp, ContentCopy } from "@mui/icons-material";
import {
  ModalContenedor,
  ModalImagen,
  ModalTitulo,
  RedesSocialesContenedor,
  CopiarLinkButton,
} from "./CompartirModal.styled";

const CompartirModal = ({ abierto, cerrar, servicio, imagenesServicio }) => {
  const [mensajePersonalizado, setMensajePersonalizado] = useState("");

  const copiarEnlace = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Enlace copiado al portapapeles!");
  };

  const compartirEnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(url, "_blank");
  };

  const compartirEnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${window.location.href}`;
    window.open(url, "_blank");
  };

  return (
    <Modal open={abierto} onClose={cerrar}>
      <ModalContenedor>
        <ModalImagen
          src={
            imagenesServicio && imagenesServicio[0]
              ? imagenesServicio[0].urlImagen
              : "https://via.placeholder.com/150"
          }
          alt={servicio.nombre}
        />
        <ModalTitulo variant="h6">
          Compartir producto: {servicio.nombre}
        </ModalTitulo>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={mensajePersonalizado}
          onChange={(e) => setMensajePersonalizado(e.target.value)}
          label="Escribe un mensaje personalizado (opcional)"
        />
        <RedesSocialesContenedor>
          <IconButton onClick={compartirEnFacebook} color="primary">
            <Facebook />
          </IconButton>
          <IconButton onClick={compartirEnWhatsApp} color="success">
            <WhatsApp />
          </IconButton>
          <IconButton onClick={copiarEnlace} color="action">
            <ContentCopy />
          </IconButton>
        </RedesSocialesContenedor>
        <CopiarLinkButton onClick={copiarEnlace}>
          Copiar enlace
        </CopiarLinkButton>
      </ModalContenedor>
    </Modal>
  );
};

export default CompartirModal;
