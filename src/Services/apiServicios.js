import axios from "axios";

const API_URL = "http://localhost:8080";

export const obtenerServicios = async () => {
  try {
    const respuesta = await axios.get(`${API_URL}/servicios/all`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
};

export const crearServicio = async (nuevoServicio) => {
  try {
    const respuesta = await axios.post(`${API_URL}/servicios`, nuevoServicio);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return null;
  }
};

export const editarServicio = async (id, datosActualizados) => {
  try {
    const respuesta = await axios.put(
      `${API_URL}/servicios/${id}`,
      datosActualizados
    );
    return respuesta.data;
  } catch (error) {
    console.error("Error al editar el servicio:", error);
    return null;
  }
};

export const eliminarServicio = async (id) => {
  try {
    await axios.delete(`${API_URL}/servicios/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    return false;
  }
};
