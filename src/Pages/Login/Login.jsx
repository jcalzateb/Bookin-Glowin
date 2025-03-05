import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import {
  ContenedorFormulario,
  CampoInput,
  BotonAccion,
  MensajeError,
  Enlace,
} from "./Login.styled";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
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

    if (!datos.password.trim()) {
      erroresTemp.password = "La contraseña es obligatoria";
    }

    setErrores(erroresTemp);
    setBotonDeshabilitado(Object.keys(erroresTemp).length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = await login(formulario.email, formulario.password);

    if (!usuario) {
      setErrores({ general: "Credenciales incorrectas. Inténtalo de nuevo." });
    } else {
      navigate("/");
    }
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      {errores.general && <MensajeError>{errores.general}</MensajeError>}

      <CampoInput
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formulario.email}
        onChange={handleChange}
        required
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

      <BotonAccion type="submit" disabled={botonDeshabilitado}>
        Iniciar Sesión
      </BotonAccion>

      <Enlace to="/registrar">¿No tienes cuenta? Regístrate aquí</Enlace>
      <Enlace to="#">¿Olvidaste tu contraseña?</Enlace>
    </ContenedorFormulario>
  );
};

export default Login;
