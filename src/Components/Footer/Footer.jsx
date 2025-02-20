import React from "react";
import { ContenedorFooter, TextoFooter, LogoFooter } from "./Footer.styled";
import Isologo from "../../assets/isologoFooter.png";

const Footer = () => {
  return (
    <ContenedorFooter>
      <LogoFooter src={Isologo} alt="Logo" />
      <TextoFooter>
        Copyright 2025 Glowin. Todos los derechos reservados.
      </TextoFooter>
    </ContenedorFooter>
  );
};

export default Footer;
