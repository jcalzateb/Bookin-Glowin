import React, { useState } from "react";
import servicios from "../../Utils/servicios.json";
import categoriasData from "../../Utils/categorias.json";
import {
  ContenedorFormulario,
  CampoContenedor,
  Etiqueta,
  CampoInput,
  AreaTexto,
  ContenedorImagenes,
  CajaImagen,
  BotonAccion,
  ContenedorBotones,
  CampoSelect,
  TituloFormulario,
  ContenedorCaracteristicas,
  TituloCaracteristicas,
  MensajeError,
  IconoEstado,
  IconoError,
  IconoSuccess,
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
  const [validacion, setValidacion] = useState({});

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoEstado = { ...formulario, [name]: value };
    setFormulario(nuevoEstado);

    validarCampo(name, value);
  };

  // Función para manejar la subida de imágenes
  const handleImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    const urlsImagenes = archivos.map((archivo) =>
      URL.createObjectURL(archivo)
    );

    setFormulario({ ...formulario, imagenes: urlsImagenes });
  };

  // Validar campo individualmente
  const validarCampo = (name, value) => {
    let mensajeError = "";
    let estadoValidacion = "success"; // Estado por defecto

    // Validación general de campo vacío
    if (!value.trim()) {
      mensajeError = "Este campo es obligatorio";
      estadoValidacion = "error";
    }

    // Validaciones específicas para números
    if (["precio", "duracion", "cantidadSecciones"].includes(name)) {
      if (isNaN(value)) {
        mensajeError = "Debe ser un número";
        estadoValidacion = "error";
      }
    }

    // Validación del nombre para evitar duplicados
    if (name === "nombre") {
      const servicioExistente = servicios.find(
        (servicio) =>
          servicio.nombre.toLowerCase() === value.toLowerCase().trim()
      );
      if (servicioExistente) {
        mensajeError = "Este servicio ya existe";
        estadoValidacion = "error";
      }
    }

    // Actualizar estados de error y validación
    setErrores((prev) => ({ ...prev, [name]: mensajeError }));
    setValidacion((prev) => ({ ...prev, [name]: estadoValidacion }));
  };

  // Función para validar el formulario antes de agregar
  const validarFormulario = () => {
    let erroresTemp = {};

    Object.keys(formulario).forEach((campo) => {
      validarCampo(campo, formulario[campo]);
      if (!formulario[campo].trim()) {
        erroresTemp[campo] = "Este campo es obligatorio";
      }
    });

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
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
      setValidacion({});
    }
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <TituloFormulario>Formulario de Servicio</TituloFormulario>
      <CampoContenedor>
        <Etiqueta>Nombre del Servicio</Etiqueta>
        <CampoInput
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          placeholder="Ej. Corte de Cabello"
          estado={validacion.nombre}
        />
        {errores.nombre && <MensajeError>{errores.nombre}</MensajeError>}
        {validacion.nombre === "error" && (
          <IconoEstado>
            <IconoError />
          </IconoEstado>
        )}
        {validacion.nombre === "success" && (
          <IconoEstado>
            <IconoSuccess />
          </IconoEstado>
        )}
      </CampoContenedor>
      <ContenedorCaracteristicas>
        <TituloCaracteristicas>Características</TituloCaracteristicas>
        <CampoContenedor>
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
          {errores.categoria && (
            <MensajeError>{errores.categoria}</MensajeError>
          )}
        </CampoContenedor>
        <CampoContenedor>
          <Etiqueta>Precio</Etiqueta>
          <CampoInput
            type="text"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
            placeholder="Ej. 25000"
            estado={validacion.precio}
          />
          {errores.precio && <MensajeError>{errores.precio}</MensajeError>}
          {validacion.precio === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.precio === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>

        <CampoContenedor>
          <Etiqueta>Duración (minutos)</Etiqueta>
          <CampoInput
            type="text"
            name="duracion"
            value={formulario.duracion}
            onChange={handleChange}
            placeholder="Ej. 45"
            estado={validacion.duracion}
          />
          {errores.duracion && <MensajeError>{errores.duracion}</MensajeError>}
          {validacion.duracion === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.duracion === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>

        <CampoContenedor>
          <Etiqueta>Cantidad de Secciones</Etiqueta>
          <CampoInput
            type="text"
            name="cantidadSecciones"
            value={formulario.cantidadSecciones}
            onChange={handleChange}
            placeholder="Ej. 5"
            estado={validacion.cantidadSecciones}
          />
          {errores.cantidadSecciones && (
            <MensajeError>{errores.cantidadSecciones}</MensajeError>
          )}
          {validacion.cantidadSecciones === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.cantidadSecciones === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>
      </ContenedorCaracteristicas>

      <Etiqueta>Descripción</Etiqueta>
      <AreaTexto
        name="descripcion"
        value={formulario.descripcion}
        onChange={handleChange}
        placeholder="Breve descripción del servicio..."
        estado={validacion.duracion}
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
