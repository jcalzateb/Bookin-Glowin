import React, { useState } from "react";
import serviciosData from "../../Utils/servicios.json";
import categoriasData from "../../Utils/categorias.json";
import usuariosData from "../../Utils/usuarios.json";
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
  const [vistaActual, setVistaActual] = useState("agregar");
  const [servicios, setServicios] = useState(serviciosData);
  const [categorias, setCategorias] = useState(categoriasData);
  const [usuarios, setUsuarios] = useState(usuariosData);
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  const servicioExiste = (nombre) => servicios.some((s) => s.nombre === nombre);

  const agregarServicio = (nuevoServicio) => {
    if (servicioExiste(nuevoServicio.nombre)) {
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
      texto: "¿Desea guardar el producto?",
      callback: () => {
        setServicios([
          ...servicios,
          { id: servicios.length + 1, ...nuevoServicio },
        ]);
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
  };

  const esPantallaPequena = useMediaQuery({ maxWidth: 760 });

  if (esPantallaPequena) {
    return (
      <MensajeNoDisponible>❌ Admin Panel no disponible.</MensajeNoDisponible>
    );
  }

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
          <FormularioGestion agregarServicio={agregarServicio} />
        )}
        {vistaActual === "listarServicios" && (
          <TablaProductos
            servicios={servicios}
            eliminarServicio={eliminarServicio}
          />
        )}
        {vistaActual === "agregarCategoria" && (
          <GestionCategorias agregarCategoria={agregarCategoria} />
        )}
        {vistaActual === "usuarios" && (
          <TablaUsuarios
            usuarios={usuarios}
            cambiarRol={cambiarRolUsuario}
            eliminarUsuario={eliminarUsuario}
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
