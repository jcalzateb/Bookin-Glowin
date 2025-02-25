import React, { useState } from "react";
import {
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  MensajeError,
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

  // Función para manejar los cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    validarFormulario({ ...formulario, [name]: value });
  };

  // Validaciones
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

    // Validación de correo
    if (!/\S+@\S+\.\S+/.test(datos.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }

    // Validación de contraseña
    if (datos.contraseña.length < 8 || !/\d/.test(datos.contraseña)) {
      erroresTemp.contraseña = "Mínimo 8 caracteres y al menos un número";
    }

    // Confirmar contraseña
    if (datos.confirmarContraseña !== datos.contraseña) {
      erroresTemp.confirmarContraseña = "Las contraseñas no coinciden";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(Object.keys(erroresTemp).length > 0);
  };

  // Mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Usuario registrado correctamente (simulación)");
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>

      <CampoInput
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formulario.nombre}
        onChange={handleChange}
      />
      {errores.nombre && <MensajeError>{errores.nombre}</MensajeError>}

      <CampoInput
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formulario.apellido}
        onChange={handleChange}
      />
      {errores.apellido && <MensajeError>{errores.apellido}</MensajeError>}

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

      <CampoInput
        type="password"
        name="confirmarContraseña"
        placeholder="Confirmar Contraseña"
        value={formulario.confirmarContraseña}
        onChange={handleChange}
      />
      {errores.confirmarContraseña && (
        <MensajeError>{errores.confirmarContraseña}</MensajeError>
      )}

      <BotonAccion type="submit" disabled={botonDeshabilitado}>
        Registrarse
      </BotonAccion>
    </ContenedorFormulario>
  );
};

export default Registro;
