import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./Login.styled";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });
  if (!formulario) {
    setFormulario({ email: "", password: "" });
  }

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
    if (!formulario.email || !/\S+@\S+\.\S+/.test(formulario.email)) {
      erroresTemp.email = "Correo electrónico inválido";
    }
    if (!formulario.password || formulario.password.trim() === "") {
      erroresTemp.password = "La contraseña es obligatoria";
    }
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const respuesta = await loginUsuario(formulario);
      if (respuesta) {
        login(respuesta);
        navigate("/"); // Redirige a la página de inicio o dashboard
      } else {
        setMensajeError("Credenciales incorrectas. Intente nuevamente.");
      }
    } catch (error) {
      setMensajeError("Ocurrió un error al iniciar sesión.");
    }
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
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
          required
        />
        {errores.password && <MensajeError>{errores.password}</MensajeError>}

        <BotonAccion type="submit">Iniciar Sesión</BotonAccion>

        <Enlace to="/registrar">¿No tienes cuenta? Regístrate aquí</Enlace>
        <Enlace to="#">¿Olvidaste tu contraseña?</Enlace>
      </ContenedorFormulario>
    </ContenedorLogin>
  );
};

export default Login;
