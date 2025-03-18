import React, { useState } from "react";
import {
  ContenedorFooter,
  TextoFooter,
  LogoFooter,
  RedesSociales,
  IconoRedSocial,
  VentanaEmergente,
  BotonCerrar,
  ContenidoCompartir,
  BotonRedSocial,
} from "./Footer.styled";
import Isologo from "../../assets/isologoFooter.png";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [mostrarVentana, setMostrarVentana] = useState(false);

  const manejarCompartir = () => {
    setMostrarVentana(true);
  };

  const cerrarVentana = () => {
    setMostrarVentana(false);
  };

  return (
    <ContenedorFooter>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LogoFooter src={Isologo} alt="Logo" />
        <TextoFooter>
          Copyright 2025 Glowin. Todos los derechos reservados.
        </TextoFooter>
      </div>
      <RedesSociales>
        <IconoRedSocial
          href="https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/producto"
          target="_blank"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </IconoRedSocial>
        <IconoRedSocial
          href="https://www.linkedin.com/shareArticle?url=https://www.tusitio.com/producto"
          target="_blank"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </IconoRedSocial>
        <IconoRedSocial
          href="https://twitter.com/intent/tweet?url=https://www.tusitio.com/producto&text=Descripción breve del producto"
          target="_blank"
          aria-label="Twitter"
        >
          <FaTwitter />
        </IconoRedSocial>
        <IconoRedSocial
          href="https://www.instagram.com/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram />
        </IconoRedSocial>
      </RedesSociales>
      {mostrarVentana && (
        <VentanaEmergente>
          <BotonCerrar onClick={cerrarVentana}>X</BotonCerrar>
          <ContenidoCompartir>
            <img
              src="https://via.placeholder.com/150"
              alt="Producto"
              style={{ width: "100px", marginBottom: "10px" }}
            />
            <p>Descripción breve del producto.</p>
            <a href="https://www.tusitio.com/producto" target="_blank" rel="noopener noreferrer">
              Ver producto
            </a>
            <textarea
              placeholder="Agrega un mensaje personalizado..."
              style={{ width: "100%", marginTop: "10px" }}
            />
            <div>
              <BotonRedSocial href="https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/producto" target="_blank">
                Compartir en Facebook
              </BotonRedSocial>
              <BotonRedSocial href="https://twitter.com/intent/tweet?url=https://www.tusitio.com/producto&text=Descripción breve del producto" target="_blank">
                Compartir en Twitter
              </BotonRedSocial>
              <BotonRedSocial href="https://www.instagram.com/" target="_blank">
                Compartir en Instagram
              </BotonRedSocial>
            </div>
          </ContenidoCompartir>
        </VentanaEmergente>
      )}
    </ContenedorFooter>
  );
};

export default Footer;