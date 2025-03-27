import api from "./apiConfig";

/**
 * Realiza una valoración para un producto.
 * @param {number} productoId - El ID del producto que está siendo valorado.
 * @param {number} usuarioId - El ID del usuario que está realizando la valoración.
 * @param {number} puntuacion - La puntuación de 1 a 5 estrellas.
 * @param {string} comentario - El comentario del usuario sobre el producto.
 * @returns {Promise} - Promesa con la respuesta de la valoración.
 */
export const realizarValoracion = async (
  productoId,
  usuarioId,
  puntuacion,
  comentario
) => {
  try {
    const valoracionData = {
      productoId,
      usuarioId,
      puntuacion,
      comentario,
    };

    const response = await api.post("/valoraciones", valoracionData);
    return response.data;
  } catch (error) {
    console.error("Error al guardar la valoración:", error);
    throw error;
  }
};

/**
 * Obtiene todas las valoraciones de un producto.
 * @param {number} productoId - El ID del producto.
 * @returns {Promise} - Promesa con las valoraciones del producto.
 */
export const obtenerValoracionesProducto = async (productoId) => {
  try {
    const response = await api.get(`/productos/${productoId}/valoraciones`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las valoraciones:", error);
    throw error;
  }
};

/**
 * Obtiene la puntuación media de un producto.
 * @param {number} productoId - El ID del producto.
 * @returns {Promise} - Promesa con la puntuación media del producto.
 */
export const obtenerPuntuacionMedia = async (productoId) => {
  try {
    const response = await api.get(`/productos/${productoId}/valoracion-media`);
    return response.data.puntuacionMedia;
  } catch (error) {
    console.error("Error al obtener la puntuación media:", error);
    throw error;
  }
};
