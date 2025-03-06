import React, { useState, useEffect } from "react";
import { obtenerCategorias } from "../../Services/categoriasService";
import { crearServicio, editarServicio } from "../../Services/serviciosService";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";
import {
  ContenedorFormulario,
  CampoContenedor,
  Etiqueta,
  CampoInput,
  AreaTexto,
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

const FormularioGestion = ({
  servicioSeleccionado,
  actualizarLista,
  cancelarEdicion,
}) => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoriaId: "",
    categoria: "",
    costo: "",
    duracionMinutos: "",
    cantidadSesiones: "",
    descripcion: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [errores, setErrores] = useState({});
  const [validacion, setValidacion] = useState({});
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await obtenerCategorias();
      setCategorias(data);
    };
    cargarCategorias();
  }, []);

  useEffect(() => {
    if (servicioSeleccionado) {
      const categoriaEncontrada = categorias.find(
        (cat) =>
          cat.nombre.toUpperCase() ===
          servicioSeleccionado.categoria.toUpperCase()
      );

      setFormulario({
        nombre: servicioSeleccionado.nombre || "",
        categoriaId: categoriaEncontrada ? categoriaEncontrada.id : "",
        categoria: categoriaEncontrada ? categoriaEncontrada.nombre : "",
        costo: servicioSeleccionado.costo || "",
        duracionMinutos: servicioSeleccionado.duracionMinutos || "",
        cantidadSesiones: servicioSeleccionado.cantidadSesiones || "",
        descripcion: servicioSeleccionado.descripcion || "",
      });
    } else {
      limpiarFormulario();
    }
  }, [servicioSeleccionado, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    let mensajeError = "";
    let estadoValidacion = "success";
    const valorLimpio = typeof value === "string" ? value.trim() : value;

    if (!valorLimpio) {
      mensajeError = "Este campo es obligatorio";
      estadoValidacion = "error";
    }

    if (["costo", "duracionMinutos", "cantidadSesiones"].includes(name)) {
      if (isNaN(value)) {
        mensajeError = "Debe ser un número";
        estadoValidacion = "error";
      }
    }

    /*     if (name === "nombre") {
      const servicioExistente = servicios.find(
        (servicio) =>
          servicio.nombre.toLowerCase() === value.toLowerCase().trim()
      );
      if (servicioExistente) {
        mensajeError = "Este servicio ya existe";
        estadoValidacion = "error";
      }
    } */

    setErrores((prev) => ({ ...prev, [name]: mensajeError }));
    setValidacion((prev) => ({ ...prev, [name]: estadoValidacion }));
  };

  // validar el formulario antes de agregar
  const validarFormulario = () => {
    let erroresTemp = {};

    Object.keys(formulario).forEach((campo) => {
      const valorCampo = formulario[campo];
      if (campo !== "imagenes") {
        // Se omite la validación de imágenes
        validarCampo(campo, formulario[campo]);
        if (typeof valorCampo === "string" && !valorCampo.trim()) {
          erroresTemp[campo] = "Este campo es obligatorio";
        }

        if (["precio", "duracion", "secciones"].includes(campo)) {
          if (valorCampo === "" || isNaN(Number(valorCampo))) {
            erroresTemp[campo] = "Debe ser un número";
          }
        }
      }
    });

    setErrores(erroresTemp);
    console.log("⚠️ Errores encontrados:", erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    console.log("📋 Categorías disponibles:", categorias);
    console.log(
      "🟢 Nombre de la categoría seleccionada:",
      formulario.categoria
    );

    const categoriaSeleccionada = categorias.find(
      (cat) => cat.id === parseInt(formulario.categoriaId, 10)
    );

    if (!categoriaSeleccionada) {
      console.error("❌ Error: La categoría seleccionada no existe.");
      return;
    }

    console.log("✅ Categoría encontrada:", categoriaSeleccionada);

    const servicioAEnviar = {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      duracionMinutos: parseInt(formulario.duracionMinutos, 10),
      costo: parseFloat(formulario.costo),
      cantidadSesiones: parseInt(formulario.cantidadSesiones, 10),
      categoriaId: categoriaSeleccionada.id,
      categoria: {
        nombre: categoriaSeleccionada.nombre,
        urlImagen: categoriaSeleccionada.urlImagen,
      },
    };

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: servicioSeleccionado
        ? "¿Desea actualizar este servicio?"
        : "¿Desea agregar este servicio?",
      callback: async () => {
        let resultado = null;

        if (servicioSeleccionado) {
          console.log("✏️ Actualizando servicio:", servicioAEnviar);
          resultado = await editarServicio(
            servicioSeleccionado.id,
            servicioAEnviar
          );
        } else {
          console.log("📡 Creando nuevo servicio:", servicioAEnviar);
          resultado = await crearServicio(servicioAEnviar);
        }

        if (resultado) {
          actualizarLista();
          limpiarFormulario();
        } else {
          console.error("⚠️ Error al procesar la solicitud.");
        }

        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      categoriaId: "",
      categoria: "",
      costo: "",
      duracionMinutos: "",
      cantidadSesiones: "",
      descripcion: "",
    });
    setErrores({});
    setValidacion({});

    if (servicioSeleccionado) {
      cancelarEdicion();
    }
  };

  return (
    <ContenedorFormulario onSubmit={handleSubmit}>
      <TituloFormulario>
        {servicioSeleccionado ? "Editar Servicio" : "Agregar Servicio"}
      </TituloFormulario>
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
            value={formulario.categoriaId || ""}
            onChange={(e) => {
              const categoriaSeleccionada = categorias.find(
                (cat) => cat.id === parseInt(e.target.value)
              );
              if (categoriaSeleccionada) {
                setFormulario({
                  ...formulario,
                  categoriaId: categoriaSeleccionada.id,
                  categoria: categoriaSeleccionada.nombre,
                });
              }
            }}
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
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
            name="costo"
            value={formulario.costo}
            onChange={handleChange}
            placeholder="Ej. 25000"
            estado={validacion.costo}
          />
          {errores.costo && <MensajeError>{errores.costo}</MensajeError>}
          {validacion.costo === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.costo === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>

        <CampoContenedor>
          <Etiqueta>Duración (minutos)</Etiqueta>
          <CampoInput
            type="text"
            name="duracionMinutos"
            value={formulario.duracionMinutos}
            onChange={handleChange}
            placeholder="Ej. 45"
            estado={validacion.duracionMinutos}
          />
          {errores.duracionMinutos && (
            <MensajeError>{errores.duracionMinutos}</MensajeError>
          )}
          {validacion.duracionMinutos === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.duracionMinutos === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>

        <CampoContenedor>
          <Etiqueta>Cantidad de Sesiones</Etiqueta>
          <CampoInput
            type="text"
            name="cantidadSesiones"
            value={formulario.cantidadSesiones}
            onChange={handleChange}
            placeholder="Ej. 5"
            estado={validacion.cantidadSesiones}
          />
          {errores.cantidadSesiones && (
            <MensajeError>{errores.cantidadSesiones}</MensajeError>
          )}
          {validacion.cantidadSesiones === "error" && (
            <IconoEstado>
              <IconoError />
            </IconoEstado>
          )}
          {validacion.cantidadSesiones === "success" && (
            <IconoEstado>
              <IconoSuccess />
            </IconoEstado>
          )}
        </CampoContenedor>
      </ContenedorCaracteristicas>
      <CampoContenedor>
        <Etiqueta>Descripción</Etiqueta>
        <AreaTexto
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          placeholder="Breve descripción del servicio..."
          estado={validacion.duracionMinutos}
        />
        {errores.descripcion && (
          <MensajeError>{errores.descripcion}</MensajeError>
        )}
      </CampoContenedor>

      <ContenedorBotones>
        <BotonAccion color="#28a745" onClick={handleSubmit}>
          {servicioSeleccionado ? "Actualizar Servicio" : "Agregar Servicio"}
        </BotonAccion>
        <BotonAccion color="#dc3545" onClick={limpiarFormulario}>
          {servicioSeleccionado ? "Cancelar Edición" : "Limpiar Formulario"}
        </BotonAccion>
      </ContenedorBotones>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorFormulario>
  );
};

export default FormularioGestion;
