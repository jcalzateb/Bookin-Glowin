import React, { useState, useEffect } from "react";
import {
  registrarEmpleado,
  obtenerEmpleados,
  eliminarEmpleado,
  actualizarEmpleado,
} from "../../Services/empleadosService";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";
import {
  ContenedorGestionEmpleados,
  SeccionRegistro,
  SeccionLista,
  CampoInput,
  BotonAccion,
  ContenedorBotones,
  ListaEmpleados,
  EmpleadoItem,
  BotonEliminar,
  BotonEditar,
  CeldaEmpleado,
} from "./GestionEmpleados.styled";

const GestionEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    salario: "",
    dni: "",
    tipoJornada: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const data = await obtenerEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al cargar empleados", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado({ ...nuevoEmpleado, [name]: value });
  };

  const handleGuardarEmpleado = () => {
    if (!nuevoEmpleado.nombre.trim() || !nuevoEmpleado.email.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: empleadoSeleccionado
        ? "¿Desea actualizar este empleado?"
        : "¿Desea guardar el nuevo empleado?",
      callback: async () => {
        try {
          if (empleadoSeleccionado) {
            await actualizarEmpleado(empleadoSeleccionado.id, nuevoEmpleado);
          } else {
            await registrarEmpleado(nuevoEmpleado);
          }
          cargarEmpleados();
          setNuevoEmpleado({
            nombre: "",
            apellido: "",
            email: "",
            celular: "",
            salario: "",
            dni: "",
            tipoJornada: "",
          });
          setEmpleadoSeleccionado(null);
          setError("");
        } catch (error) {
          console.error("Error al guardar el empleado", error);
        } finally {
          setMensaje({ ...mensaje, abierto: false });
        }
      },
    });
  };

  const handleSeleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setNuevoEmpleado({
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      celular: empleado.celular,
      salario: empleado.salario,
      dni: empleado.dni,
      tipoJornada: empleado.tipoJornada,
    });
    window.scrollTo({
      top: document.getElementById("formulario-empleados").offsetTop - 120,
      behavior: "smooth",
    });
  };

  const handleEliminarEmpleado = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Está seguro de que desea eliminar este empleado?",
      callback: async () => {
        try {
          await eliminarEmpleado(id);
          setEmpleados(empleados.filter((empleado) => empleado.id !== id));
        } catch (error) {
          console.error("Error al eliminar el empleado", error);
        } finally {
          setMensaje({ ...mensaje, abierto: false });
        }
      },
    });
  };

  return (
    <ContenedorGestionEmpleados>
      <SeccionRegistro id="formulario-empleados">
        <h2>
          {empleadoSeleccionado ? "Editar Empleado" : "Agregar Nuevo Empleado"}
        </h2>
        <CampoInput
          type="text"
          name="nombre"
          placeholder="Nombre del empleado"
          value={nuevoEmpleado.nombre}
          onChange={handleChange}
        />
        <CampoInput
          type="text"
          name="apellido"
          placeholder="Apellido del empleado"
          value={nuevoEmpleado.apellido}
          onChange={handleChange}
        />
        <CampoInput
          type="email"
          name="email"
          placeholder="Email del empleado"
          value={nuevoEmpleado.email}
          onChange={handleChange}
        />
        <CampoInput
          type="text"
          name="celular"
          placeholder="Celular del empleado"
          value={nuevoEmpleado.celular}
          onChange={handleChange}
        />
        <CampoInput
          type="number"
          name="salario"
          placeholder="Salario del empleado"
          value={nuevoEmpleado.salario}
          onChange={handleChange}
        />
        <CampoInput
          type="text"
          name="dni"
          placeholder="DNI del empleado"
          value={nuevoEmpleado.dni}
          onChange={handleChange}
        />
        <CampoInput
          type="text"
          name="tipoJornada"
          placeholder="Tipo de jornada"
          value={nuevoEmpleado.tipoJornada}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ContenedorBotones>
          <BotonAccion onClick={handleGuardarEmpleado}>
            {empleadoSeleccionado ? "Actualizar Empleado" : "Agregar Empleado"}
          </BotonAccion>
          {empleadoSeleccionado && (
            <BotonAccion
              color="#6c757d"
              onClick={() => setEmpleadoSeleccionado(null)}
            >
              Cancelar
            </BotonAccion>
          )}
        </ContenedorBotones>
      </SeccionRegistro>

      <SeccionLista>
        <h2>Empleados Registrados</h2>
        <ListaEmpleados>
          {empleados.map((empleado) => (
            <EmpleadoItem key={empleado.id}>
              <CeldaEmpleado>{empleado.id}</CeldaEmpleado>
              <CeldaEmpleado>
                Empleado:
                <br></br>
                {empleado.nombre} {empleado.apellido}
              </CeldaEmpleado>
              <CeldaEmpleado>Jornada: {empleado.tipoJornada}</CeldaEmpleado>
              <span>{empleado.email}</span>
              <span>{empleado.celular}</span>
              <span>{empleado.salario}</span>
              <span>{empleado.dni}</span>
              <BotonEditar onClick={() => handleSeleccionarEmpleado(empleado)}>
                Editar
              </BotonEditar>
              <BotonEliminar
                onClick={() => handleEliminarEmpleado(empleado.id)}
              >
                Eliminar
              </BotonEliminar>
            </EmpleadoItem>
          ))}
        </ListaEmpleados>
      </SeccionLista>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorGestionEmpleados>
  );
};

export default GestionEmpleados;
