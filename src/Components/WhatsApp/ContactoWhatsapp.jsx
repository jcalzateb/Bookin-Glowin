import React, { useState, useEffect } from "react";
import { linkWhatsapp } from "../../Services/usuariosService"; // Asegúrate de que la ruta sea correcta
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  WhatsappButtonContainer,
  WhatsappIcon,
  Notification,
} from "./ContactoWhatsapp.styled"; // Asegúrate de tener estos estilos

const ContactoWhatsapp = () => {
  const [whatsappLink, setWhatsappLink] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchWhatsappLink = async () => {
      try {
        const link = await linkWhatsapp(); // Llamada a la función para obtener el enlace
        setWhatsappLink(link); // Guarda el enlace recibido en el estado
      } catch (error) {
        console.error("Error al obtener el enlace de WhatsApp:", error);
        setIsError(true);
        setNotificationMessage("Error al obtener el enlace de WhatsApp.");
        setShowNotification(true);
      }
    };

    fetchWhatsappLink(); // Llama la función cuando el componente se monta
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  const handleWhatsAppClick = () => {
    if (whatsappLink) {
      window.open(whatsappLink, "_blank"); // Abre el enlace de WhatsApp en una nueva pestaña
      setNotificationMessage("¡Mensaje enviado correctamente!");
      setIsError(false);
      setShowNotification(true);
    } else {
      setNotificationMessage("No se pudo obtener el enlace de WhatsApp.");
      setIsError(true);
      setShowNotification(true);
    }

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div>
      <WhatsappButtonContainer onClick={handleWhatsAppClick}>
        <WhatsappIcon>
          <WhatsAppIcon size={32} />
        </WhatsappIcon>
      </WhatsappButtonContainer>

      {showNotification && <Notification>{notificationMessage}</Notification>}
    </div>
  );
};

export default ContactoWhatsapp;
