import React, { useState } from "react";
import serviciosData from "../../Utils/servicios.json";
import {
  ContenedorAdmin,
  MenuSuperior,
  BotonMenu,
  Contenido,
} from "./AdminPanel.styled";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";
import FormularioGestion from "./FormularioGestion";
import TablaProductos from "./TablaProductos";

const AdminPanel = () => {
  const [vistaActual, setVistaActual] = useState("agregar");
  const [servicios, setServicios] = useState(serviciosData);

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

  return (
    <ContenedorAdmin>
      <MenuSuperior>
        <BotonMenu
          $activo={vistaActual === "agregar"}
          onClick={() => setVistaActual("agregar")}
        >
          Agregar Servicio
        </BotonMenu>
        <BotonMenu
          $activo={vistaActual === "listar"}
          onClick={() => setVistaActual("listar")}
        >
          Lista de Servicios
        </BotonMenu>
      </MenuSuperior>

      <Contenido>
        {vistaActual === "agregar" ? (
          <FormularioGestion agregarServicio={agregarServicio} />
        ) : (
          <TablaProductos
            servicios={servicios}
            eliminarServicio={eliminarServicio}
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
