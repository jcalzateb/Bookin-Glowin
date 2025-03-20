import api from "./apiConfig";

const obtenerIdUsuario = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return usuario ? usuario.id : null;
};

export const agregarFavorito = async (idServicio) => {
  try {
    const usuarioId = obtenerIdUsuario();
    console.log("post favorito", usuarioId);
    console.log("post servicio", idServicio);
    if (!usuarioId)
      throw new Error("No se ha encontrado un usuario autenticado.");
    const response = await api.post("/favoritos", {
      idUsuario: usuarioId,
      idServicio: idServicio,
      fechaAgregado: new Date().toISOString().split("T")[0],
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    throw error;
  }
};

export const obtenerFavoritosUsuario = async () => {
  try {
    const usuarioId = obtenerIdUsuario();
    if (!usuarioId)
      throw new Error("No se ha encontrado un usuario autenticado.");
    console.log("get favorito", usuarioId);
    const respuesta = await api.get(`/favoritos/usuario/${usuarioId}`);
    console.log("get de los", respuesta);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return [];
  }
};

export const eliminarFavorito = async (favoritoId) => {
  try {
    console.log("Haciendo DELETE de favorito con id:", favoritoId);
    const response = await api.delete(`/favoritos/${favoritoId}`);
    console.log("Respuesta DELETE:", response);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el favorito:", error);
    throw error;
  }
};
