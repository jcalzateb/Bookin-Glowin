import api from "./apiConfig";

export const obtenerEmpleados = async () => {
  try {
    const response = await api.get("/empleados/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    throw error;
  }
};

export const registrarEmpleado = async (empleado) => {
  try {
    const response = await api.post("/empleados", empleado);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el empleado:", error);
    throw error;
  }
};

export const actualizarEmpleado = async (id, empleado) => {
  try {
    const response = await api.put(`/empleados/${id}`, empleado);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    throw error;
  }
};

export const eliminarEmpleado = async (id) => {
  try {
    const response = await api.delete(`/empleados/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    throw error;
  }
};

/**
 * Obtiene los empleados disponibles para un servicio en una hora específica
 * @param {number} idServicio - ID del servicio
 * @param {string} horaServicio - Hora del servicio (formato: "HH:MM")
 * @returns {Promise} - Promesa con la lista de empleados disponibles
 */
export const obtenerEmpleadosDisponibles = async (idServicio, horaServicio) => {
  try {
    const response = await api.get(`/empleados-servicios/servicio/${idServicio}/hora/${horaServicio}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados disponibles:", error);
    throw error;
  }
};
