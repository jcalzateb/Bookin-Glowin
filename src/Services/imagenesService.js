import api from "./apiConfig";

export const actualizarImagen = async (idServicio, datosImagen, idImagen) => {
  try {
    const imagenData = {
      titulo: datosImagen.titulo,
      descripcion: datosImagen.descripcion,
      urlImagen: datosImagen.urlImagen,
      fechaCreacion: new Date().toISOString().split("T")[0],
      idServicio: idServicio,
    };
    console.log("🚀 Enviando imagen al backend:", imagenData);
    console.log("id", idImagen);
    const response = await api.put(
      `/servicios/${idServicio}/imagenes/${idImagen}`,
      imagenData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la imagen:", error);
    throw error;
  }
};

export const crearImagenParaServicio = async (idServicio, datosImagen) => {
  try {
    const imagenData = {
      titulo: datosImagen.titulo,
      descripcion: datosImagen.descripcion,
      urlImagen: datosImagen.urlImagen,
      fechaCreacion: new Date().toISOString().split("T")[0],
      idServicio: idServicio,
      servicio: datosImagen.servicio,
    };
    console.log("🚀 Enviando imagen al backend:", imagenData);

    const response = await api.post(
      `/servicios/${idServicio}/imagenes`,
      imagenData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la imagen:", error);
    throw error;
  }
};

export const eliminarImagen = async (idServicio, idImagen) => {
  try {
    const response = await api.delete(
      `/servicios/${idServicio}/imagenes/${idImagen}`
    );
    console.log("Imagen eliminada correctamente", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
};

export const obtenerImagenesPorServicio = async (idServicio) => {
  try {
    const response = await api.get(`/servicios/${idServicio}/imagenes`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    throw error;
  }
};
