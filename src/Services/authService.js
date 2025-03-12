import api from "./apiConfig";

export const decodificarToken = (token) => {
  try {
    const partes = token.split(".");
    const payload = atob(partes[1]);
    const jsonPayload = JSON.parse(payload);
    return jsonPayload;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export const obtenerDatosUsuario = async (usuarioId) => {
  try {
    const token = localStorage.getItem("token");
    const respuesta = await api.get(`/usuarios/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

export const loginUsuario = async (credenciales) => {
  console.log("Credenciales", credenciales);
  try {
    const respuesta = await api.post("/auth/ingresar", credenciales, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta Login:", respuesta.data);
    if (respuesta.data.token) {
      localStorage.setItem("token", respuesta.data.token);
      const usuario = decodificarToken(respuesta.data.token);
      console.log("Decodificador Token:", usuario);
      if (usuario) {
        const usuarioCompleto = await obtenerDatosUsuario(usuario.id);
        console.log("Usuario Completo:", usuarioCompleto);
        if (usuarioCompleto) {
          localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
        }
      } else {
        console.error("Error: El token no contiene los datos esperados.");
      }

      return respuesta.data;
    }

    return null;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response?.data || error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

export const reenviarConfirmacion = async (email) => {
  try {
    const respuesta = await api.post(
      "/auth/resend-confirmation",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return respuesta.data;
  } catch (error) {
    console.error(
      "Error al reenviar confirmación:",
      error.response?.data || error
    );
    return null;
  }
};

export const estaAutenticado = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
