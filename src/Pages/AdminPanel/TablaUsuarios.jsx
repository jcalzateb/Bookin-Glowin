import React, { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../../Services/usuariosService";
import {
  ContenedorTablaUsuarios,
  SeccionLista,
  TablaUsuariosEstilizada,
  EncabezadoTabla,
  FilaTabla,
  CeldaEncabezado,
  CuerpoTabla,
  Celda,
  SelectRol,
  BotonEliminar,
} from "./TablaUsuarios.styled";
import MensajeModal from "../../Components/MensajeModal/MensajeModal";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState({
    abierto: false,
    tipo: "",
    texto: "",
    callback: null,
  });

  useEffect(() => {
    const cargarUsuarios = async () => {
      const usuariosBackend = await obtenerUsuarios();
      setUsuarios(usuariosBackend);
    };
    cargarUsuarios();
  }, []);

  const cambiarRol = async (id, nuevoRol) => {
    const usuarioActualizado = usuarios.find((usuario) => usuario.id === id);
    if (!usuarioActualizado) return;

    const usuarioModificado = {
      ...usuarioActualizado,
      rol: nuevoRol,
    };

    const resultado = await actualizarUsuario(id, usuarioModificado);
    if (resultado) {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
        )
      );
    }
  };

  const handleEliminarUsuario = async (id) => {
    setMensaje({
      abierto: true,
      tipo: "eliminar",
      texto: "¿Desea eliminar este servicio?",
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

  return (
    <ContenedorTablaUsuarios>
      <SeccionLista>
        <h2>Usuarios Registrados</h2>
        <TablaUsuariosEstilizada>
          <EncabezadoTabla>
            <FilaTabla>
              <CeldaEncabezado>Usuario</CeldaEncabezado>
              {/* <CeldaEncabezado>Email</CeldaEncabezado> */}
              <CeldaEncabezado>Rol</CeldaEncabezado>
              <CeldaEncabezado>Acción</CeldaEncabezado>
            </FilaTabla>
          </EncabezadoTabla>
          <CuerpoTabla>
            {usuarios.map((usuario) => (
              <FilaTabla key={usuario.id}>
                <Celda>
                  {usuario.nombre} {usuario.apellido}
                </Celda>
                {/* <Celda>{usuario.email}</Celda> */}
                <Celda>
                  <SelectRol
                    value={usuario.rol}
                    onChange={(e) => cambiarRol(usuario.id, e.target.value)}
                    disabled={usuario.rol === "SUPER_ADMINISTRADOR"}
                  >
                    <option value="CLIENTE">Cliente</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                    <option value="SUPER_ADMINISTRADOR">
                      Super Administrador
                    </option>
                  </SelectRol>
                </Celda>
                <Celda>
                  {usuario.rol !== "SUPER_ADMINISTRADOR" && (
                    <BotonEliminar
                      onClick={() => handleEliminarUsuario(usuario.id)}
                    >
                      Eliminar
                    </BotonEliminar>
                  )}
                </Celda>
              </FilaTabla>
            ))}
          </CuerpoTabla>
        </TablaUsuariosEstilizada>
      </SeccionLista>

      <MensajeModal
        abierto={mensaje.abierto}
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onConfirmar={mensaje.callback}
        onCancelar={() => setMensaje({ ...mensaje, abierto: false })}
      />
    </ContenedorTablaUsuarios>
  );
};
export default TablaUsuarios;
