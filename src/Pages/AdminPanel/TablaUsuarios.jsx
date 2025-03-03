import React, { useState } from "react";
import usuariosData from "../../Utils/usuarios.json";
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

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState(usuariosData);

  const cambiarRol = (id, nuevoRol) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
      )
    );
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  return (
    <ContenedorTablaUsuarios>
      <SeccionLista>
        <h2>Usuarios Registrados</h2>
        <TablaUsuariosEstilizada>
          <EncabezadoTabla>
            <FilaTabla>
              <CeldaEncabezado>Usuario</CeldaEncabezado>
              <CeldaEncabezado>Email</CeldaEncabezado>
              <CeldaEncabezado>Rol</CeldaEncabezado>
              <CeldaEncabezado>Acción</CeldaEncabezado>
            </FilaTabla>
          </EncabezadoTabla>
          <CuerpoTabla>
            {usuarios.map((usuario) => (
              <FilaTabla key={usuario.id}>
                <Celda>{usuario.nombre}</Celda>
                <Celda>{usuario.email}</Celda>
                <Celda>
                  <SelectRol
                    value={usuario.rol}
                    onChange={(e) => cambiarRol(usuario.id, e.target.value)}
                    disabled={usuario.rol === "admin"} // No se puede cambiar el admin principal
                  >
                    <option value="admin">Admin</option>
                    <option value="usuario administrador">
                      Usuario Administrador
                    </option>
                    <option value="usuario">Usuario</option>
                  </SelectRol>
                </Celda>
                <Celda>
                  {usuario.rol !== "admin" && (
                    <BotonEliminar onClick={() => eliminarUsuario(usuario.id)}>
                      Eliminar
                    </BotonEliminar>
                  )}
                </Celda>
              </FilaTabla>
            ))}
          </CuerpoTabla>
        </TablaUsuariosEstilizada>
      </SeccionLista>
    </ContenedorTablaUsuarios>
  );
};

export default TablaUsuarios;
