// utilidades.js
export const asignarPuntuacionAleatoria = () => {
  const puntuaciones = [4.0, 4.5, 5.0];
  const indiceAleatorio = Math.floor(Math.random() * puntuaciones.length);
  return puntuaciones[indiceAleatorio];
};

export const obtenerNombreCategoria = (nombre) => {
  const mapeoCategorias = {
    CABELLO: "Cabello",
    UNIAS: "Uñas",
    PESTANIAS: "Pestañas",
    FACIAL_MAQUILLAJE: "Facial Maquillaje",
    CEJAS: "Cejas",
    CORPORAL_DEPILACION: "Corporal Depilación",
    GLOWIN_MEN: "Glowin Men",
  };

  if (mapeoCategorias[nombre]) {
    return mapeoCategorias[nombre];
  }

  const partes = nombre.split("_");
  if (partes.length > 1) {
    if (partes[0] === "GLOWIN") {
      return partes[1];
    }
    return partes.join(" ");
  }
  return nombre;
};

export const comentariosPredefinidos = [
  {
    comentario: "Excelente servicio, muy profesional.",
    usuario: "David",
    fecha: "25/03/2025",
  },
  {
    comentario: "Muy buen servicio, me encantó el resultado.",
    usuario: "Valentina",
    fecha: "26/03/2025",
  },
  {
    comentario: "Atención impecable, lo recomiendo mucho.",
    usuario: "Andres",
    fecha: "27/03/2025",
  },
  {
    comentario: "Todo perfecto, me voy muy feliz con el resultado.",
    usuario: "Erick",
    fecha: "28/03/2025",
  },
  {
    comentario: "Muy recomendable, excelente trato y resultado.",
    usuario: "Farid",
    fecha: "29/03/2025",
  },
  {
    comentario: "El servicio fue rápido y de calidad. Lo recomiendo a todos.",
    usuario: "Maria",
    fecha: "30/03/2025",
  },
  {
    comentario: "Me sorprendió lo bien que me atendieron, ¡lo volveré a hacer!",
    usuario: "Daniel",
    fecha: "31/03/2025",
  },
  {
    comentario: "Excelente experiencia, superó mis expectativas. ¡Gracias!",
    usuario: "Luis",
    fecha: "01/04/2025",
  },
];
