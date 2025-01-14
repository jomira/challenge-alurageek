import { getProductos, createProducto, deleteProducto } from "./api/data.js";

const productoLista = document.querySelector(".producto-lista");
const noProductsMessage = document.querySelector(".no-productos");
const productForm = document.querySelector("#producto-form");

// Renderizar productos
const renderProducts = async () => {
  const productos = await getProductos();
  productoLista.innerHTML = "";

  if (productos.length === 0) {
    noProductsMessage.style.display = "block";
  } else {
    noProductsMessage.style.display = "none";
    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-container--info">
          <p>${producto.nombre}</p>
          <div class="card-container--value">
            <p>$ ${producto.precio.toFixed(2)}</p>
            <img src="./assets/trash.svg" alt="Delete" data-id="${producto.id}" class="delete-icon">
          </div>
        </div>
      `;
      productoLista.appendChild(card);
    });
  }
};

// Agregar producto
productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.querySelector("#producto-nombre").value;
  const precio = parseFloat(document.querySelector("#producto-precio").value);
  const imagen = document.querySelector("#producto-imagen").value;

  await createProducto({ nombre, precio, imagen });
  productForm.reset();
  renderProducts();
});

// Eliminar producto
productoLista.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-icon")) {
    const productoId = event.target.getAttribute("data-id");
    await deleteProducto(productoId);
    renderProducts();
  }
});

// Inicializar renderización
renderProducts();