import React, { useState } from "react";
import usuarios from "../../Utils/usuarios.json";
import {
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  MensajeError,
  Enlace,
} from "./Login.styled";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUsuarioAutenticado }) => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    email: "",
    contraseña: "",
  });

  const [errores, setErrores] = useState({});
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    validarFormulario({ ...formulario, [name]: value });
  };

  // Validacion
  const validarFormulario = (datos) => {
    let erroresTemp = {};

    // Validar correo
    if (!/\S+@\S+\.\S+/.test(datos.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }

    // Validar que la contraseña no esté vacía
    if (!datos.contraseña.trim()) {
      erroresTemp.contraseña = "La contraseña es obligatoria";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(Object.keys(erroresTemp).length > 0);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === formulario.email
    );

    if (!usuarioEncontrado) {
      setErrores({ general: "Correo no registrado" });
      return;
    }

    // Guardar en localStorage para simular sesión iniciada
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        rol: usuarioEncontrado.rol,
      })
    );

    setUsuarioAutenticado(usuarioEncontrado);
    navigate("/"); // Redirigir a la página principal
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

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
        autoComplete="current-password"
      />
      {errores.contraseña && <MensajeError>{errores.contraseña}</MensajeError>}

      <BotonAccion type="submit" disabled={botonDeshabilitado}>
        Iniciar Sesión
      </BotonAccion>

      <Enlace to="/registro">¿No tienes cuenta? Regístrate aquí</Enlace>
      <Enlace to="#">¿Olvidaste tu contraseña?</Enlace>
    </ContenedorFormulario>
  );
};

export default Login;
