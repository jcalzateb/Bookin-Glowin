import React, { useState, useEffect } from "react";
import {
  obtenerServicios,
  eliminarServicio,
} from "../../Services/serviciosService";
import { obtenerCategorias } from "../../Services/categoriasService";
import {
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../../Services/usuariosService";
import { useMediaQuery } from "react-responsive";

import {
  ContenedorAdmin,
  MenuSuperior,
  BotonMenu,
  Contenido,
  MensajeNoDisponible,
} from "./AdminPanel.styled";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";
import FormularioGestion from "./FormularioGestion";
import TablaProductos from "./TablaProductos";
import GestionCategorias from "./GestionCategorias";
import TablaUsuarios from "./TablaUsuarios";

const AdminPanel = () => {
  const [vistaActual, setVistaActual] = useState("agregarServicio");
  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    actualizarLista();
    cargarCategorias();
    cargarUsuarios();
  }, []);

  const actualizarLista = async () => {
    try {
      const data = await obtenerServicios();
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const seleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    setVistaActual("agregarServicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setServicioSeleccionado(null);
  };

  const handleEliminarServicio = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este servicio?",
      callback: async () => {
        const resultado = await eliminarServicio(id);
        if (resultado) {
          actualizarLista();
        } else {
          console.error("Error al eliminar el servicio.");
        }
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const cambiarRolUsuario = async (id, nuevoRol) => {
    const usuarioActualizado = usuarios.find((usuario) => usuario.id === id);
    if (!usuarioActualizado) return;

    const usuarioModificado = { ...usuarioActualizado, rol: nuevoRol };

    const resultado = await actualizarUsuario(id, usuarioModificado);
    if (resultado) {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
        )
      );
    }
  };

  const handleEliminarUsuario = (id) => {
    const usuario = usuarios.find((user) => user.id === id);
    if (usuario.rol === "SUPER_ADMINISTRADOR") {
      setMensaje({
        abierto: true,
        tipo: "error",
        texto: "No se puede eliminar al Super Administrador.",
        callback: () => setMensaje({ ...mensaje, abierto: false }),
      });
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este usuario?",
      callback: async () => {
        const resultado = await eliminarUsuario(id);
        if (resultado) {
          setUsuarios((prevUsuarios) =>
            prevUsuarios.filter((usuario) => usuario.id !== id)
          );
        }
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const esPantallaPequena = useMediaQuery({ maxWidth: 760 });

  if (esPantallaPequena) {
    return (
      <MensajeNoDisponible> No disponible para mobile.</MensajeNoDisponible>
    );
  }

  /* 
  const servicioExiste = (nombre) => servicios.some((s) => s.nombre === nombre);

  const agregarServicio = (nuevoServicio) => {
    if (servicioExiste(nuevoServicio.nombre) && !servicioSeleccionado) {
      setMensaje({
        abierto: true,
        tipo: "error",
        texto: "El nombre asignado al producto ya existe",
        callback: () => setMensaje({ ...mensaje, abierto: false }),
      });
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: servicioSeleccionado
        ? "¿Desea actualizar el servicio?"
        : "¿Desea guardar el servicio?",
      callback: () => {
        if (servicioSeleccionado) {
          setServicios(
            servicios.map((servicio) =>
              servicio.id === servicioSeleccionado.id
                ? { ...nuevoServicio, id: servicioSeleccionado.id }
                : servicio
            )
          );
        } else {
          setServicios([
            ...servicios,
            { id: servicios.length + 1, ...nuevoServicio },
          ]);
        }
        setServicioSeleccionado(null);
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };
  const eliminarServicio = (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar el producto?",
      callback: () => {
        setServicios(servicios.filter((servicio) => servicio.id !== id));
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const agregarCategoria = (nuevaCategoria) => {
    const existe = categorias.some(
      (cat) => cat.nombre.toLowerCase() === nuevaCategoria.nombre.toLowerCase()
    );

    if (existe) {
      setMensaje({
        abierto: true,
        tipo: "error",
        texto: "Esta categoría ya existe.",
        callback: () => setMensaje({ ...mensaje, abierto: false }),
      });
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "confirmacion",
      texto: "¿Desea guardar la nueva categoría?",
      callback: () => {
        setCategorias([
          ...categorias,
          { id: categorias.length + 1, ...nuevaCategoria },
        ]);
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  };

  const cambiarRolUsuario = (id, nuevoRol) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
      )
    );
  };

  const eliminarUsuario = (id) => {
    const usuario = usuarios.find((user) => user.id === id);
    if (usuario.rol === "admin") {
      setMensaje({
        abierto: true,
        tipo: "error",
        texto: "No se puede eliminar al administrador principal.",
        callback: () => setMensaje({ ...mensaje, abierto: false }),
      });
      return;
    }

    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este usuario?",
      callback: () => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        setMensaje({ ...mensaje, abierto: false });
      },
    });
  }; */

  return (
    <ContenedorAdmin>
      <MenuSuperior>
        <BotonMenu
          $activo={vistaActual === "agregarServicio"}
          onClick={() => setVistaActual("agregarServicio")}
        >
          Agregar Servicio
        </BotonMenu>
        <BotonMenu
          $activo={vistaActual === "listarServicios"}
          onClick={() => setVistaActual("listarServicios")}
        >
          Lista de Servicios
        </BotonMenu>
        <BotonMenu
          $activo={vistaActual === "agregarCategoria"}
          onClick={() => setVistaActual("agregarCategoria")}
        >
          Categoría
        </BotonMenu>
        <BotonMenu
          $activo={vistaActual === "usuarios"}
          onClick={() => setVistaActual("usuarios")}
        >
          Usuarios
        </BotonMenu>
      </MenuSuperior>

      <Contenido>
        {vistaActual === "agregarServicio" && (
          <FormularioGestion
            servicioSeleccionado={servicioSeleccionado}
            actualizarLista={actualizarLista}
            cancelarEdicion={cancelarEdicion}
          />
        )}
        {vistaActual === "listarServicios" && (
          <TablaProductos
            servicios={servicios}
            eliminarServicio={handleEliminarServicio}
            seleccionarServicio={seleccionarServicio}
          />
        )}
        {vistaActual === "agregarCategoria" && <GestionCategorias />}
        {vistaActual === "usuarios" && (
          <TablaUsuarios
            usuarios={usuarios}
            cambiarRol={cambiarRolUsuario}
            eliminarUsuario={handleEliminarUsuario}
          />
        )}
      </Contenido>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorAdmin>
  );
};

export default AdminPanel;
