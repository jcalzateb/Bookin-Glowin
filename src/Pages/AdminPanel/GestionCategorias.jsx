import React, { useState, useEffect } from "react";
import {
  obtenerCategorias,
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
  obtenerCategoriaPorId,
} from "../../Services/categoriasService";
import {
  eliminarServicio,
  obtenerServicios,
} from "../../Services/serviciosService";
import {
  obtenerImagenesPorServicio,
  eliminarImagen,
} from "../../Services/imagenesService";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";
import {
  ContenedorGestionCategorias,
  SeccionRegistro,
  SeccionLista,
  CampoInput,
  BotonAccion,
  ContenedorBotones,
  ListaCategorias,
  CategoriaItem,
  ImagenCategoria,
  BotonEliminar,
  BotonEditar,
} from "./GestionCategorias.styled";
import { obtenerNombreCategoria } from "../../Utils/utils";

const GestionCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    urlImagen: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  const handleGuardarCategoria = () => {
    if (!nuevaCategoria.nombre.trim() || !nuevaCategoria.urlImagen.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: categoriaSeleccionada
        ? "¿Desea actualizar la categoría?"
        : "¿Desea guardar la nueva categoría?",
      callback: async () => {
        try {
          if (categoriaSeleccionada) {
            await editarCategoria(categoriaSeleccionada.id, nuevaCategoria);
          } else {
            await agregarCategoria(nuevaCategoria);
          }
          cargarCategorias();
          setNuevaCategoria({ nombre: "", urlImagen: "" });
          setCategoriaSeleccionada(null);
          setError("");
        } catch (error) {
          console.error("Error al guardar la categoría", error);
        } finally {
          setMensaje({ ...mensaje, abierto: false });
        }
      },
    });
  };

  const handleSeleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNuevaCategoria({
      nombre: categoria.nombre,
      urlImagen: categoria.urlImagen,
    });
    window.scrollTo({
      top: document.getElementById("formulario-categorias").offsetTop - 120,
      behavior: "smooth",
    });
  };

  const handleCancelarEdicion = () => {
    setCategoriaSeleccionada(null);
    setNuevaCategoria({ nombre: "", urlImagen: "" });
    setError("");
  };

  const handleEliminarCategoria = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto:
        "¿Está seguro de que desea eliminar esta categoría? Se eliminarán todos los servicios asociados.",
      callback: async () => {
        try {
          console.log(`Iniciando eliminación de la categoría con id: ${id}`);

          // Obtener todos los servicios
          const servicios = await obtenerServicios();
          console.log(`Servicios obtenidos: ${JSON.stringify(servicios)}`);

          // Filtrar los servicios por la categoría
          const serviciosAEliminar = servicios.filter(
            (servicio) => servicio.categoriaId === id
          );
          console.log(
            `Servicios asociados a la categoría ${id}: ${JSON.stringify(
              serviciosAEliminar
            )}`
          );

          // Eliminar las imágenes asociadas a cada servicio
          if (serviciosAEliminar.length > 0) {
            console.log(`Eliminando imágenes de los servicios...`);
            for (const servicio of serviciosAEliminar) {
              // Obtener las imágenes de cada servicio
              const imagenes = await obtenerImagenesPorServicio(servicio.id);
              // Eliminar todas las imágenes asociadas al servicio
              await Promise.all(
                imagenes.map(async (imagen) => {
                  await eliminarImagen(servicio.id, imagen.id);
                  console.log(`Imagen con id ${imagen.id} eliminada`);
                })
              );
            }

            // Eliminar los servicios de la categoría
            console.log(`Eliminando ${serviciosAEliminar.length} servicios...`);
            await Promise.all(
              serviciosAEliminar.map((servicio) => {
                console.log(`Eliminando servicio con id: ${servicio.id}`);
                return eliminarServicio(servicio.id);
              })
            );
            console.log("Servicios eliminados con éxito.");
          } else {
            console.log("No hay servicios para eliminar.");
          }

          // Eliminar la categoría
          console.log(`Eliminando categoría con id: ${id}`);
          await eliminarCategoria(id);
          console.log("Categoría eliminada con éxito.");

          // Actualizar la lista de categorías después de eliminar
          setCategorias((prevCategorias) =>
            prevCategorias.filter((categoria) => categoria.id !== id)
          );
          console.log("Lista de categorías actualizada.");
          setMensaje({ ...mensaje, abierto: false });
        } catch (error) {
          console.error(
            "Error al eliminar la categoría y sus servicios:",
            error
          );
          setMensaje({ ...mensaje, abierto: false });
        }
      },
    });
  };
  return (
    <ContenedorGestionCategorias>
      <SeccionRegistro id="formulario-categorias">
        <h2>
          {categoriaSeleccionada
            ? "Editar Categoría"
            : "Agregar Nueva Categoría"}
        </h2>
        <CampoInput
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={nuevaCategoria.nombre}
          onChange={handleChange}
        />
        <CampoInput
          type="text"
          name="urlImagen"
          placeholder="URL de la imagen"
          value={nuevaCategoria.urlImagen}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ContenedorBotones>
          <BotonAccion onClick={handleGuardarCategoria}>
            {categoriaSeleccionada
              ? "Actualizar Categoría"
              : "Agregar Categoría"}
          </BotonAccion>
          {categoriaSeleccionada && (
            <BotonAccion color="#6c757d" onClick={handleCancelarEdicion}>
              Cancelar
            </BotonAccion>
          )}
        </ContenedorBotones>
      </SeccionRegistro>

      <SeccionLista>
        <h2>Categorías Registradas</h2>
        <ListaCategorias>
          {categorias.map((categoria) => (
            <CategoriaItem key={categoria.id}>
              <ImagenCategoria
                src={categoria.urlImagen}
                alt={categoria.nombre}
              />
              <span>{obtenerNombreCategoria(categoria.nombre)}</span>
              <BotonEditar
                onClick={() => handleSeleccionarCategoria(categoria)}
              >
                Editar
              </BotonEditar>
              <BotonEliminar
                onClick={() => handleEliminarCategoria(categoria.id)}
              >
                Eliminar
              </BotonEliminar>
            </CategoriaItem>
          ))}
        </ListaCategorias>
      </SeccionLista>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorGestionCategorias>
  );
};

export default GestionCategorias;
