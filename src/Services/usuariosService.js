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

export const crearUsuario = async (nuevoUsuario) => {
  try {
    const respuesta = await api.post("/usuarios", nuevoUsuario);
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
