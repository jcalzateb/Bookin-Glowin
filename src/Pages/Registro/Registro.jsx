import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../Services/usuariosService";
import { reenviarConfirmacion } from "../../Services/authService";
import RegistroModal from "../../Components/RegistroModal/RegistroModal";
import {
  ContenedorRegistro,
  TituloRegistro,
  ContenedorFormulario,
  ContenedorIzquierda,
  ContenedorDerecha,
  CampoInput,
  BotonAccion,
  MensajeError,
  ContenedorRadio,
  TextoDecorativo,
} from "./Registro.styled";

const Registro = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    password: "",
    confirmarPassword: "",
  });

  const [errores, setErrores] = useState({});
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);
  const [radioSeleccionado, setRadioSeleccionado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...formulario, [name]: value };
    setFormulario(nuevosDatos);
    validarFormulario(nuevosDatos);
  };

  const validarFormulario = (datos) => {
    let erroresTemp = {};
    const soloLetras = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

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

    if (!datos.celular.trim()) {
      erroresTemp.celular = "El número de celular es obligatorio";
    } else if (!soloNumeros.test(datos.celular)) {
      erroresTemp.celular = "Solo se permiten números";
    }

    if (datos.password.length < 8 || !/\d/.test(datos.password)) {
      erroresTemp.password = "Mínimo 8 caracteres y al menos un número";
    }

    if (datos.confirmarPassword !== datos.password) {
      erroresTemp.confirmarPassword = "Las contraseñas no coinciden";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(
      Object.keys(erroresTemp).length > 0 || !radioSeleccionado
    );
  };

  const handleRadioChange = () => {
    const nuevoRadio = !radioSeleccionado;
    setRadioSeleccionado(nuevoRadio);
    setBotonDeshabilitado(!nuevoRadio || Object.keys(errores).length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioARegistrar = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      email: formulario.email.trim(),
      celular: formulario.celular.trim(),
      password: formulario.password,
      rol: "CLIENTE",
    };

    console.log("📡 Enviando datos al backend:", usuarioARegistrar);

    const resultado = await registrarUsuario(usuarioARegistrar);

    if (!resultado) {
      setErrores({
        general: "Error al registrar usuario. Inténtalo nuevamente.",
      });
    } else {
      setEmailConfirmacion(formulario.email);
      limpiarFormulario();
      setOpenModal(true);
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      password: "",
      confirmarPassword: "",
    });
    setErrores({});
    setRadioSeleccionado(false);
    setBotonDeshabilitado(true);
  };

  const handleReenviarCorreo = async () => {
    try {
      console.log("Email para reenviar:", emailConfirmacion);
      if (emailConfirmacion) {
        const resultado = await reenviarConfirmacion(emailConfirmacion);
        if (resultado) {
          console.log("Resultado para reenviar:", resultado);
          setMensajeModal("Correo reenviado exitosamente a ");
        } else {
          setMensajeModal("Hubo un error al reenviar el correo.");
        }
      } else {
        setMensajeModal("No se ha proporcionado un correo electrónico.");
      }
    } catch (error) {
      console.error("Error al reenviar correo:", error);
      setMensajeModal("Error al reenviar el correo. Intenta nuevamente.");
    }
  };

  const handleCerrarModal = () => {
    setOpenModal(false);
    navigate("/ingresar");
  };

  return (
    <ContenedorRegistro>
      <ContenedorIzquierda></ContenedorIzquierda>
      <ContenedorDerecha>
        <TituloRegistro>Regístrate</TituloRegistro>
        <ContenedorFormulario onSubmit={handleSubmit}>
          <CampoInput
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formulario.nombre}
            onChange={handleChange}
            $error={errores.nombre}
            $touched={formulario.nombre.trim().length > 0}
          />
          {errores.nombre && <MensajeError>{errores.nombre}</MensajeError>}

          <CampoInput
            type="text"
            name="apellido"
            placeholder="Ingresa tu apellido"
            value={formulario.apellido}
            onChange={handleChange}
            $error={errores.apellido}
            $touched={formulario.apellido.trim().length > 0}
          />
          {errores.apellido && <MensajeError>{errores.apellido}</MensajeError>}

          <CampoInput
            type="email"
            name="email"
            placeholder="Ingresa tu dirección de email"
            value={formulario.email}
            onChange={handleChange}
            $error={errores.email}
            $touched={formulario.email.trim().length > 0}
          />
          {errores.email && <MensajeError>{errores.email}</MensajeError>}

          <CampoInput
            type="text"
            name="celular"
            placeholder="Ingresa tu número de celular"
            value={formulario.celular}
            onChange={handleChange}
            $error={errores.celular}
            $touched={formulario.celular.trim().length > 0}
          />
          {errores.celular && <MensajeError>{errores.celular}</MensajeError>}

          <CampoInput
            type="password"
            name="password"
            placeholder="Crea una contraseña"
            value={formulario.password}
            onChange={handleChange}
            $error={errores.password}
            $touched={formulario.password.trim().length > 0}
          />
          {errores.password && <MensajeError>{errores.password}</MensajeError>}

          <CampoInput
            type="password"
            name="confirmarPassword"
            placeholder="Confirma tu contraseña"
            value={formulario.confirmarPassword}
            onChange={handleChange}
            $error={errores.confirmarPassword}
            $touched={formulario.confirmarPassword.trim().length > 0}
          />
          {errores.confirmarPassword && (
            <MensajeError>{errores.confirmarPassword}</MensajeError>
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
          {errores.terminos && <MensajeError>{errores.terminos}</MensajeError>}

          <BotonAccion type="submit" disabled={botonDeshabilitado}>
            Crear cuenta
          </BotonAccion>
        </ContenedorFormulario>

        <RegistroModal
          open={openModal}
          onClose={handleCerrarModal}
          onReenviarCorreo={handleReenviarCorreo}
          email={emailConfirmacion}
          mensajeModal={mensajeModal}
        />
      </ContenedorDerecha>
    </ContenedorRegistro>
  );
};

export default Registro;
