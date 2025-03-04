import React, { useState } from "react";
import {
  ContenedorRegistro,
  TituloRegistro,
  ContenedorFormulario,
  ContenedorIzquierda,
  CampoInput,
  BotonAccion,
  MensajeError,
  ContenedorRadio,
  TextoDecorativo,
} from "./Registro.styled";

const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [radioSeleccionado, setRadioSeleccionado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...formulario, [name]: value };
    setFormulario(nuevosDatos);
    validarFormulario(nuevosDatos);
  };

  const validarFormulario = (datos) => {
    let erroresTemp = {};
    const soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;

    if (!datos.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    } else if (!soloLetras.test(datos.nombre)) {
      erroresTemp.nombre = "Solo se permiten letras";
    }

    if (!datos.apellido.trim()) {
      erroresTemp.apellido = "El apellido es obligatorio";
    } else if (!soloLetras.test(datos.apellido)) {
      erroresTemp.apellido = "Solo se permiten letras";
    }

    if (!/\S+@\S+\.\S+/.test(datos.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }

    if (datos.contraseña.length < 8 || !/\d/.test(datos.contraseña)) {
      erroresTemp.contraseña = "Mínimo 8 caracteres y al menos un número";
    }

    if (datos.confirmarContraseña !== datos.contraseña) {
      erroresTemp.confirmarContraseña = "Las contraseñas no coinciden";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(Object.keys(erroresTemp).length > 0 || !radioSeleccionado);
  };

  const handleRadioChange = () => {
    const nuevoRadio = !radioSeleccionado;
    setRadioSeleccionado(nuevoRadio);
    setBotonDeshabilitado(!nuevoRadio || Object.keys(errores).length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Usuario registrado correctamente (simulación)");
  };

  return (
    <ContenedorRegistro>
      <ContenedorIzquierda>
        <TituloRegistro>REGÍSTRATE</TituloRegistro>
        <ContenedorFormulario onSubmit={handleSubmit}>
          <CampoInput    
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formulario.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <MensajeError>{errores.nombre}</MensajeError>}

          <CampoInput            type="text"
            name="apellido"
            placeholder="Ingresa tu apellido"
            value={formulario.apellido}
            onChange={handleChange}
          />
          {errores.apellido && <MensajeError>{errores.apellido}</MensajeError>}

          <CampoInput            
            type="email"
            name="email"
            placeholder="Ingresa tu dirección de email"
            value={formulario.email}
            onChange={handleChange}
          />
          {errores.email && <MensajeError>{errores.email}</MensajeError>}

          <CampoInput            
            type="password"
            name="contraseña"
            placeholder="Crea una contraseña"
            value={formulario.contraseña}
            onChange={handleChange}
          />
          {errores.contraseña && <MensajeError>{errores.contraseña}</MensajeError>}

          <CampoInput            
            type="password"
            name="confirmarContraseña"
            placeholder="Ingresa tu contraseña"
            value={formulario.confirmarContraseña}
            onChange={handleChange}
          />
          {errores.confirmarContraseña && (
            <MensajeError>{errores.confirmarContraseña}</MensajeError>
          )}

          <ContenedorRadio>
            <input
              type="radio"
              id="terminos"
              name="terminos"
              checked={radioSeleccionado}
              onChange={handleRadioChange}
            />
            <TextoDecorativo>Acepto los términos y condiciones</TextoDecorativo>
          </ContenedorRadio>

          <BotonAccion type="submit" disabled={botonDeshabilitado}>
            Crear cuenta
          </BotonAccion>
        </ContenedorFormulario>
      </ContenedorIzquierda>
    </ContenedorRegistro>
  );
};

export default Registro;