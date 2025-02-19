import React from "react";
import { ContenedorAdmin, SeccionIzquierda, SeccionDerecha, TituloSeccion } from "./AdminPanel.styled";
import FormularioGestion from "./FormularioGestion";
import TablaProductos from "./TablaProductos";

const AdminPanel = () => {
  return (
    <ContenedorAdmin>

      <SeccionIzquierda>
        <TituloSeccion>Agregar o editar producto</TituloSeccion>
        <FormularioGestion />
      </SeccionIzquierda>

      <SeccionDerecha>
        <TituloSeccion>Lista de productos</TituloSeccion>
        <TablaProductos />
      </SeccionDerecha>
    </ContenedorAdmin>
  );
};

export default AdminPanel;
