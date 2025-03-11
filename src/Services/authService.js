import api from "./apiConfig";

export const loginUsuario = async (credenciales) => {
  try {
    const respuesta = await api.post(`/auth/login`, credenciales, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (respuesta.data.token) {
      localStorage.setItem("token", respuesta.data.token); // Guardamos el token en localStorage
      localStorage.setItem("usuarioId", respuesta.data.id); // Guardamos el ID de usuario en localStorage
      return respuesta.data;
    }
    return null;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response?.data || error);
    return null;
  }
};

export const reenviarConfirmacion = async (email) => {
  try {
    const respuesta = await api.post(
      `/auth/resend-confirmation`,
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

export const obtenerUsuarioActual = async () => {
  try {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");

    if (!token || !usuarioId) {
      console.error("❌ No hay token o usuarioId en localStorage.");
      return null;
    }

    const respuesta = await api.get(`/usuarios/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return respuesta.data;
  } catch (error) {
    console.error("❌ Error al obtener el usuario actual:", error);
    return null;
  }
};
