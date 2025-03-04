import React, { useState } from "react";
import {
  ContenedorLogin,
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  MensajeError,
  Enlace,
  Titulo,
} from "./Login.styled";
import { Link } from "react-router-dom";

const Login = () => {
  const [formulario, setFormulario] = useState({
    email: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    validarFormulario({ ...formulario, [name]: value });
  };

  const validarFormulario = (datos) => {
    let erroresTemp = {};

    if (!/\S+@\S+\.\S+/.test(datos.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }

    if (!datos.contraseña.trim()) {
      erroresTemp.contraseña = "La contraseña es obligatoria";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(Object.keys(erroresTemp).length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inicio de sesión exitoso (simulación)");
  };

  return (
    <ContenedorLogin>
      <ContenedorFormulario onSubmit={handleSubmit}>
        <Titulo>Iniciar Sesión</Titulo>
        <CampoInput
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formulario.email}
          onChange={handleChange}
        />
        {errores.email && <MensajeError>{errores.email}</MensajeError>}

        <CampoInput
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formulario.contraseña}
          onChange={handleChange}
        />
        {errores.contraseña && <MensajeError>{errores.contraseña}</MensajeError>}

        <BotonAccion type="submit" disabled={botonDeshabilitado}>
          Iniciar Sesión
        </BotonAccion>

        <Enlace to="/registrar">¿No tienes cuenta? Regístrate aquí</Enlace>
        <Enlace to="#">¿Olvidaste tu contraseña?</Enlace>
      </ContenedorFormulario>
    </ContenedorLogin>
  );
};

export default Login;