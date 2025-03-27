import React, { useState } from "react";
import {
  WhatsappIcon,
  WhatsappButtonContainer,
  Notification,
} from "./ContactoWhatsapp.styled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const ContactoWhatsapp = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Número de teléfono y mensaje predeterminado
  const phoneNumber = "+1234567890"; // Reemplaza con tu número real
  const defaultMessage = "Hola, estoy interesado en sus productos.";

  const handleWhatsAppClick = () => {
    try {
      // Validar número de teléfono
      if (!phoneNumber || !/^\+?[\d\s-]+$/.test(phoneNumber)) {
        throw new Error("Número de WhatsApp no válido");
      }

      // Formatear el mensaje para URL
      const encodedMessage = encodeURIComponent(defaultMessage);

      // Crear el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Abrir en nueva pestaña
      window.open(whatsappUrl, "_blank");

      // Mostrar notificación de éxito
      setNotificationMessage("¡Mensaje enviado correctamente!");
      setIsError(false);
      setShowNotification(true);
    } catch (error) {
      // Manejo de errores
      setNotificationMessage(`Error: ${error.message}`);
      setIsError(true);
      setShowNotification(true);
    } finally {
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  return (
    <>
      <WhatsappButtonContainer onClick={handleWhatsAppClick}>
        <WhatsappIcon>
          <WhatsAppIcon size={32} />
        </WhatsappIcon>
      </WhatsappButtonContainer>

      {showNotification && (
        <Notification isError={isError}>{notificationMessage}</Notification>
      )}
    </>
  );
};

export default ContactoWhatsapp;
