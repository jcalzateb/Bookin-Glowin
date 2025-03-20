import api from "./apiConfig";

export const obtenerCategorias = async () => {
  try {
    const response = await api.get("/categorias-servicios/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};

export const agregarCategoria = async (nuevaCategoria) => {
  try {
    const response = await api.post("/categorias-servicios", nuevaCategoria);
    return response.data;
  } catch (error) {
    console.error("Error al agregar categoría:", error);
    throw error;
  }
};

export const editarCategoria = async (id, categoriaActualizada) => {
  try {
    const response = await api.put(
      `/categorias-servicios/${id}`,
      categoriaActualizada
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar categoría:", error);
    throw error;
  }
};

export const eliminarCategoria = async (id) => {
  try {
    await api.delete(`/categorias-servicios/${id}`);
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error;
  }
};

export const obtenerCategoriaPorId = async (idCategoria) => {
  try {
    const response = await api.get(`/categorias-servicios/${idCategoria}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoría por ID:", error);
    return null;
  }
};
