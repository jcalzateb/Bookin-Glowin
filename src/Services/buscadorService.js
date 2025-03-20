import api from "./apiConfig";

/**
 * Busca servicios que contengan el término de búsqueda proporcionado
 * @param {string} query - El término de búsqueda
 * @returns {Promise} - Promesa con los resultados de la búsqueda
 */
export const buscarServicios = async (query) => {
  try {
    const respuesta = await api.get(`/search/services`, {
      params: { query }
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al buscar servicios:", error);
    throw error;
  }
};