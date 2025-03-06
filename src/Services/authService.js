import api from "./apiConfig";

export const loginUsuario = async (credenciales) => {
  try {
    const respuesta = await api.post(`/auth/login`, credenciales, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    return respuesta.data;
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
