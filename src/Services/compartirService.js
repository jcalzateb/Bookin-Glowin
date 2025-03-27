import api from "./apiConfig";

// Obtener enlaces para compartir
export const obtenerEnlacesCompartir = async (idServicio) => {
  try {
    const response = await api.get(`/servicios/${idServicio}/compartir`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los enlaces de compartir:", error);
    throw error;
  }
};
