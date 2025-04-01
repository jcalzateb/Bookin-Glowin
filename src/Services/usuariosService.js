import api from "./apiConfig";

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await api.get("/usuarios/all");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const respuesta = await api.get(`/usuarios/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    return null;
  }
};

export const registrarUsuario = async (nuevoUsuario) => {
  try {
    const fechaActual = new Date();
    const fechaRegistro = fechaActual.toISOString().split("T")[0];
    const horaRegistro = fechaActual.toTimeString().split(" ")[0];

    const usuarioAEnviar = {
      ...nuevoUsuario,
      fechaRegistro,
      horaRegistro,
      rol: nuevoUsuario.rol || "CLIENTE",
    };

    console.log("📡 Enviando usuario al backend:", usuarioAEnviar);

    const respuesta = await api.post(`/usuarios`, usuarioAEnviar, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return null;
  }
};

export const actualizarUsuario = async (id, datosActualizados) => {
  try {
    const respuesta = await api.put(`/usuarios/${id}`, datosActualizados);
    return respuesta.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    return null;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    await api.delete(`/usuarios/${id}`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    return false;
  }
};

export const loginUsuario = async (email, password) => {
  try {
    const respuesta = await api.post("/auth/ingresar", { email, password });

    if (respuesta.data) {
      localStorage.setItem("token", respuesta.data.token);
      localStorage.setItem("usuarioId", respuesta.data.id);
      console.log("✅ Usuario autenticado:", respuesta.data);
    }

    return respuesta.data;
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    return null;
  }
};

export const linkWhatsapp = async () => {
  try {
    // Realiza la solicitud GET a la API
    const response = await api.get("/usuarios/soporte");
    // Verifica que la respuesta tenga la propiedad 'whatsappLink' y retorna el enlace
    if (response && response.data && response.data.whatsappLink) {
      return response.data.whatsappLink;
    } else {
      throw new Error("Enlace de WhatsApp no disponible.");
    }
  } catch (error) {
    console.error("Error al obtener el enlace de WhatsApp:", error);
    throw error; // Lanza el error para que el componente lo pueda manejar
  }
};
