import React, { useState } from "react";
import categoriasData from "../../Utils/categorias.json";
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
  const [categorias, setCategorias] = useState(categoriasData);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    imagen: "",
  });
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  // agregar categoría
  const handleAgregarCategoria = () => {
    if (!nuevaCategoria.nombre.trim() || !nuevaCategoria.imagen.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const existe = categorias.some(
      (cat) => cat.nombre.toLowerCase() === nuevaCategoria.nombre.toLowerCase()
    );

    if (existe && !categoriaEditando) {
      setError("Esta categoría ya existe");
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: categoriaEditando
        ? "¿Desea actualizar la categoría?"
        : "¿Desea guardar la nueva categoría?",
      callback: () => {
        if (categoriaEditando) {
          setCategorias(
            categorias.map((cat) =>
              cat.id === categoriaEditando.id
                ? { ...cat, ...nuevaCategoria }
                : cat
            )
          );
          setCategoriaEditando(null);
        } else {
          setCategorias([
            ...categorias,
            { id: categorias.length + 1, ...nuevaCategoria },
          ]);
        }

        setNuevaCategoria({ nombre: "", imagen: "" });
        setError("");
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const handleEditarCategoria = (categoria) => {
    setNuevaCategoria({ nombre: categoria.nombre, imagen: categoria.imagen });
    setCategoriaEditando(categoria);
    window.scrollTo({
      top: document.getElementById("formulario-categorias").offsetTop - 120,
      behavior: "smooth",
    });
  };

  const handleCancelarEdicion = () => {
    setCategoriaEditando(null);
    setNuevaCategoria({ nombre: "", imagen: "" });
    setError("");
  };

  const handleEliminarCategoria = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar la categoría?",
      callback: () => {
        setCategorias(categorias.filter((cat) => cat.id !== id));
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  return (
    <ContenedorGestionCategorias>
      <SeccionRegistro id="formulario-categorias">
        <h2>
          {categoriaEditando ? "Editar Categoría" : "Agregar Nueva Categoría"}
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
          name="imagen"
          placeholder="URL de la imagen"
          value={nuevaCategoria.imagen}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ContenedorBotones>
          <BotonAccion onClick={handleAgregarCategoria}>
            {categoriaEditando ? "Actualizar Categoría" : "Agregar Categoría"}
          </BotonAccion>
          {categoriaEditando && (
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
              <ImagenCategoria src={categoria.imagen} alt={categoria.nombre} />
              <span>{categoria.nombre}</span>
              <BotonEditar onClick={() => handleEditarCategoria(categoria)}>
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
