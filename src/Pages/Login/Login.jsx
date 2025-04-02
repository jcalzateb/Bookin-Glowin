import React, { useState, useContext } from "react";
import { loginUsuario } from "../../Services/authService";
import { AuthContext } from "../../Context/AuthContext";
import {
  ContenedorLogin,
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  MensajeError,
  Enlace,
  Titulo,
  ContenedorDerecha,
  ContenedorIzquierda,
} from "./Login.styled";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });

  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState("");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrores({ ...errores, [name]: "" });
  };

  const validarFormulario = () => {
    let erroresTemp = {};
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

    if (!correoRegex.test(formulario.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const respuesta = await loginUsuario(formulario);
      console.log("Respuesta del login:", respuesta);
      if (respuesta?.token) {
        await login(formulario);
      } else {
        setErrores({
          general: "Credenciales incorrectas. Intente nuevamente.",
        });
      }
    } catch (error) {
      setErrores({ general: "Ocurrió un error al iniciar sesión." });
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <ContenedorLogin>
      <ContenedorIzquierda></ContenedorIzquierda>
      <ContenedorDerecha>
        <ContenedorFormulario onSubmit={handleSubmit}>
          <Titulo>Iniciar Sesión</Titulo>
          <CampoInput
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formulario.email}
            onChange={handleChange}
            $error={errores.email}
            required
          />
          <CampoInput
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formulario.password}
            onChange={handleChange}
            required
          />
          {errores.email && <MensajeError>{errores.email}</MensajeError>}
          {errores.general && <MensajeError>{errores.general}</MensajeError>}
          <BotonAccion type="submit">Iniciar Sesión</BotonAccion>

          <Enlace to="/registrar">¿No tienes cuenta? Regístrate aquí</Enlace>
          <Enlace to="#">¿Olvidaste tu contraseña?</Enlace>
        </ContenedorFormulario>
      </ContenedorDerecha>
    </ContenedorLogin>
  );
};

export default Login;
