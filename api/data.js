const API_URL = "http://localhost:3000/productos";

export const getProductos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// export const getProductos = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/productos');
//     if (!response.ok) {
//       throw new Error('Error al obtener los productos');
//     }
//     const productos = await response.json();
//     return productos;
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     alert('Hubo un problema al cargar los productos');
//     return [];
//   }
// };


export const createProducto = async (producto) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  return response.json();
};

export const deleteProducto = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};