export const generarProductosAleatorios = (productos, cantidad) => {
    let productosAleatorios = [];
    let indicesUsados = new Set();
  
    while (productosAleatorios.length < cantidad) {
      let indiceAleatorio = Math.floor(Math.random() * productos.length);
      if (!indicesUsados.has(indiceAleatorio)) {
        productosAleatorios.push(productos[indiceAleatorio]);
        indicesUsados.add(indiceAleatorio);
      }
    }
  
    return productosAleatorios;
  };
  