import React from "react";
import { Tabla, BotonAccion } from "./TablaProductos.styled";

const productos = [
  { id: 1, nombre: "Corte", categoria: "Cabello", precio: "$5000", duracion: "30 min", profesional: "Ana", turnos: "Mañana" },
  { id: 2, nombre: "Manicure", categoria: "Uñas", precio: "$8000", duracion: "45 min", profesional: "Luis", turnos: "Tarde" },
];

const TablaProductos = () => {
  return (
    <Tabla>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Duración</th>
          <th>Profesional</th>
          <th>Turnos</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.categoria}</td>
            <td>{producto.precio}</td>
            <td>{producto.duracion}</td>
            <td>{producto.profesional}</td>
            <td>{producto.turnos}</td>
            <td>
              <BotonAccion editar>✏️</BotonAccion>
              <BotonAccion eliminar>❌</BotonAccion>
            </td>
          </tr>
        ))}
      </tbody>
    </Tabla>
  );
};

export default TablaProductos;
