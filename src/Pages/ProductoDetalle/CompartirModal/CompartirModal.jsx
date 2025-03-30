import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  ModalContenedor,
  ModalImagen,
  ModalTitulo,
  RedesSocialesContenedor,
  CopiarLinkButton,
  ContenedorCompartir,
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
        <ContenedorCompartir>
          <IconButton
            onClick={cerrar}
            size="small"
            sx={{
              fontSize: "30px",
            }}
          >
            <CloseIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
          <Typography variant="h2" sx={{ color: "#2d0363" }}>
            Compartir
          </Typography>
        </ContenedorCompartir>

        <ModalImagen
          src={
            imagenesServicio && imagenesServicio[0]
              ? imagenesServicio[0].urlImagen
              : "https://via.placeholder.com/150"
          }
          alt={servicio.nombre}
        />
        <ModalTitulo variant="h6" sx={{ color: "#2d0363" }}>
          Compartir servicio: {servicio.nombre}
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
            sx={{
              fontSize: "30px",
              border: "2px solid #1877F2",
              borderRadius: "50%",
              padding: "8px",
              color: "#1877F2",
              "&:hover": {
                backgroundColor: "#1877F2",
                color: "white",
              },
            }}
          >
            <FacebookOutlinedIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
          <IconButton
            onClick={compartirEnWhatsApp}
            color="success"
            disabled={!enlacesCompartir.whatsapp}
            sx={{
              fontSize: "30px",
              border: "2px solid #25D366",
              borderRadius: "50%",
              padding: "8px",
              color: "#25D366",
              "&:hover": {
                backgroundColor: "#25D366",
                color: "white",
              },
            }}
          >
            <WhatsApp sx={{ fontSize: "inherit" }} />
          </IconButton>
        </RedesSocialesContenedor>
        <CopiarLinkButton onClick={copiarEnlace}>Copiar</CopiarLinkButton>
      </ModalContenedor>
    </Modal>
  );
};

export default CompartirModal;
