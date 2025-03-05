import React, { useState, useEffect } from "react";
import {
  obtenerCategorias,
  agregarCategoria,
  editarCategoria,
  eliminarCategoria,
} from "../../Services/categoriasService";
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
      setError("Error al cargar categorías");
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
          setError("Error al guardar la categoría");
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
      texto: "¿Desea eliminar la categoría?",
      callback: async () => {
        try {
          await eliminarCategoria(id);
          cargarCategorias();
        } catch (error) {
          setError("Error al eliminar la categoría");
        } finally {
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
              <span>{categoria.nombre}</span>
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
