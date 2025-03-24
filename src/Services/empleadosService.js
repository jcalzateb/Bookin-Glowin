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
