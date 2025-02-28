import React, { useState } from "react";
import servicios from "../../Utils/servicios.json";
import categoriasData from "../../Utils/categorias.json";
import {
  ContenedorFormulario,
  Etiqueta,
  CampoInput,
  AreaTexto,
  ContenedorImagenes,
  CajaImagen,
  BotonAccion,
  ContenedorBotones,
  CampoSelect,
} from "./FormularioGestion.styled";

const FormularioGestion = ({ agregarServicio }) => {
  // Estado para los valores del formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    duracion: "",
    cantidadSecciones: "",
    descripcion: "",
    imagenes: [],
  });

  // Estado para los errores de validación
  const [errores, setErrores] = useState({});

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };
  // Función para manejar la subida de imágenes
  const handleImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    const urlsImagenes = archivos.map((archivo) =>
      URL.createObjectURL(archivo)
    );

    setFormulario({ ...formulario, imagenes: urlsImagenes });
  };

  // Función para validar el formulario antes de agregar
  const validarFormulario = () => {
    let erroresTemp = {};

    // Validar campos vacíos
    Object.keys(formulario).forEach((campo) => {
      if (!formulario[campo].trim()) {
        erroresTemp[campo] = "Este campo es obligatorio";
      }
    });

    // Validar que el precio y duración sean números
    if (formulario.precio && isNaN(Number(formulario.precio))) {
      erroresTemp.precio = "Debe ser un número";
    }

    if (formulario.duracion && isNaN(Number(formulario.duracion))) {
      erroresTemp.duracion = "Debe ser un número";
    }

    if (
      formulario.cantidadSecciones &&
      isNaN(Number(formulario.cantidadSecciones))
    ) {
      erroresTemp.cantidadSecciones = "Debe ser un número";
    }

    // Validar que el nombre del servicio no se repita
    const servicioExistente = servicios.find(
      (servicio) =>
        servicio.nombre.toLowerCase() === formulario.nombre.toLowerCase()
    );

    if (servicioExistente) {
      erroresTemp.nombre = "Este servicio ya existe";
    }

    setErrores(erroresTemp);

    return Object.keys(erroresTemp).length === 0; // Si no hay errores, retorna true
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Crear nuevo servicio
      const nuevoServicio = {
        id: servicios.length + 1,
        ...formulario,
      };

      // Agregar servicio a la lista (simulado por ahora)
      agregarServicio(nuevoServicio);

      // Resetear formulario
      setFormulario({
        nombre: "",
        categoria: "",
        precio: "",
        duracion: "",
        cantidadSecciones: "",
        descripcion: "",
        imagenes: [],
      });

      setErrores({});
    }
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <Etiqueta>Nombre del Servicio</Etiqueta>
      <CampoInput
        type="text"
        name="nombre"
        value={formulario.nombre}
        onChange={handleChange}
        placeholder="Ej. Corte de Cabello"
      />
      {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}

      <Etiqueta>Categoría</Etiqueta>
      <CampoSelect
        name="categoria"
        value={formulario.categoria}
        onChange={handleChange}
      >
        <option value="">Seleccionar Categoría</option>
        {categoriasData.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </CampoSelect>
      {errores.categoria && <p style={{ color: "red" }}>{errores.categoria}</p>}

      <Etiqueta>Precio</Etiqueta>
      <CampoInput
        type="text"
        name="precio"
        value={formulario.precio}
        onChange={handleChange}
        placeholder="Ej. 25000"
      />
      {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}

      <Etiqueta>Duración (minutos)</Etiqueta>
      <CampoInput
        type="text"
        name="duracion"
        value={formulario.duracion}
        onChange={handleChange}
        placeholder="Ej. 45"
      />
      {errores.duracion && <p style={{ color: "red" }}>{errores.duracion}</p>}

      <Etiqueta>Descripción</Etiqueta>
      <AreaTexto
        name="descripcion"
        value={formulario.descripcion}
        onChange={handleChange}
        placeholder="Breve descripción del servicio..."
      />
      {errores.descripcion && (
        <p style={{ color: "red" }}>{errores.descripcion}</p>
      )}

      <Etiqueta>Subir Imágenes </Etiqueta>
      <input type="file" multiple accept="image/*" onChange={handleImagenes} />

      <ContenedorImagenes>
        {formulario.imagenes.map((img, index) => (
          <CajaImagen key={index}>
            <img src={img} alt={`Imagen ${index + 1}`} />
          </CajaImagen>
        ))}
      </ContenedorImagenes>

      <ContenedorBotones>
        <BotonAccion color="#28a745" onClick={handleSubmit}>
          Agregar Servicio
        </BotonAccion>
        <BotonAccion
          color="#dc3545"
          onClick={() =>
            setFormulario({
              nombre: "",
              categoria: "",
              precio: "",
              duracion: "",
              cantidadSecciones: "",
              descripcion: "",
              imagenes: [],
            })
          }
        >
          Limpiar Formulario
        </BotonAccion>
      </ContenedorBotones>
    </ContenedorFormulario>
  );
};

export default FormularioGestion;
