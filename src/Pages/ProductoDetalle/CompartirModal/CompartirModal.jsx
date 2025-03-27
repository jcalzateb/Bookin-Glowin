import React, { useState, useEffect } from "react";
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
import { obtenerEnlacesCompartir } from "../../../Services/compartirService";

const CompartirModal = ({ abierto, cerrar, servicio, imagenesServicio }) => {
  const [mensajePersonalizado, setMensajePersonalizado] = useState("");
  const [enlacesCompartir, setEnlacesCompartir] = useState({
    facebook: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (servicio && servicio.id) {
      obtenerEnlacesCompartir(servicio.id)
        .then((data) => {
          setEnlacesCompartir({
            facebook: data.enlaceFacebook,
            whatsapp: data.enlaceWhatsApp,
          });
        })
        .catch((error) => {
          console.error("Error al obtener enlaces para compartir:", error);
        });
    }
  }, [servicio]);

  const copiarEnlace = () => {
    const imagenUrl =
      imagenesServicio && imagenesServicio[0]
        ? imagenesServicio[0].urlImagen
        : "https://via.placeholder.com/150";

    const mensajeCompleto = `
      ¡Mira este servicio increíble! 
      ${servicio.nombre}
      ${imagenUrl}
      Enlace: ${window.location.href}
      ${mensajePersonalizado ? `${mensajePersonalizado}` : "Brilla con estilo"}
    `;

    navigator.clipboard.writeText(mensajeCompleto);
    alert("Enlace copiado al portapapeles!");
  };

  const compartirEnFacebook = () => {
    window.open(enlacesCompartir.facebook, "_blank");
  };

  const compartirEnWhatsApp = () => {
    window.open(enlacesCompartir.whatsapp, "_blank");
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
          <IconButton
            onClick={compartirEnFacebook}
            color="primary"
            disabled={!enlacesCompartir.facebook}
          >
            <Facebook />
          </IconButton>
          <IconButton
            onClick={compartirEnWhatsApp}
            color="success"
            disabled={!enlacesCompartir.whatsapp}
          >
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
