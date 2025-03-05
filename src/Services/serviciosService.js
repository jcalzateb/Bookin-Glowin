import api from "./apiConfig";

export const obtenerServicios = async () => {
  try {
    const respuesta = await api.get(`/servicios/all`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
};

export const crearServicio = async (nuevoServicio) => {
  try {
    const respuesta = await api.post(`/servicios`, nuevoServicio, {
      headers: { "Content-Type": "application/json" },
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return null;
  }
};

export const editarServicio = async (id, datosActualizados) => {
  try {
    const respuesta = await api.put(`/servicios/${id}`, datosActualizados, {
      headers: { "Content-Type": "application/json" },
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al editar el servicio:", error);
    return null;
  }
};
export const eliminarServicio = async (id) => {
  try {
    await api.delete(`/servicios/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    return false;
  }
};
