import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componentes/NavBar/Navbar';
import Inicio from './Componentes/Inicio/Inicio';
import Nosotros from './Componentes/Nosotros/Nosotros';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';

function App() {
  // 1. Estado para mostrar/ocultar carrito (Ya lo tenías)
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // 2. NUEVO: Estado para guardar los productos del carrito
  const [carrito, setCarrito] = useState([]);

  // 3. NUEVO: Calculamos el total automáticamente sumando los precios
  const total = carrito.reduce((acumulador, producto) => acumulador + producto.Precio, 0);

  // 4. NUEVO: Función para agregar productos
  const agregarAlCarrito = (productoNuevo) => {
    setCarrito([...carrito, productoNuevo]);
    setMostrarCarrito(true); // Abre el carrito al comprar para feedback visual
  };
  // 5. NUEVO: Función para borrar todo
  const vaciarCarrito = () => {
    setCarrito([]); // Volvemos el estado a un array vacío
  };

  const manejarApertura = () => setMostrarCarrito(true);
  const manejarCierre = () => setMostrarCarrito(false);

  return (
    <BrowserRouter>
      {/* Pasamos 'cantidad' para que (si quieres) el Navbar muestre cuántos items hay */}
      <Navbar abrirCarrito={manejarApertura} cantidad={carrito.length} />

      {/* --- MENU LATERAL (OFFCANVAS) --- */}
      <div
        className={`offcanvas offcanvas-end ${mostrarCarrito ? 'show' : ''}`}
        tabIndex="-1"
        style={{ visibility: mostrarCarrito ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Tu Pedido 🍰</h5>
          <button type="button" className="btn-close" onClick={manejarCierre}></button>
        </div>

        {/* NUEVO: Cuerpo del carrito con lógica (Vacío vs Lista) */}
        <div className="offcanvas-body">
          {carrito.length === 0 ? (
            <p>El carrito está vacío 😢</p>
          ) : (
            <ul className="list-group">
              {carrito.map((producto, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {producto.Nombre}
                  <span className="badge bg-primary rounded-pill text-light">
                    ${producto.Precio}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* NUEVO: Footer fijo con el Total y Botón de compra */}
        {carrito.length > 0 && (
          <div className="p-3 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Total:</h4>
              <h4 className="text-success fw-bold">${total}</h4>
            </div>
            <button
              className="btn btn-outline-danger w-100 mb-2"
              onClick={vaciarCarrito}
            >
              Vaciar Carrito 🗑️
            </button>
            <button
              className="btn btn-dark w-100"
              onClick={() => alert('¡Gracias por tu compra!')}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Fondo oscuro al abrir el carrito */}
      {mostrarCarrito && <div className="offcanvas-backdrop fade show" onClick={manejarCierre}></div>}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* NUEVO: Pasamos la función 'agregarAlCarrito' al contenedor de items */}
        <Route
          path="/catalogo"
          element={<ItemListContainer agregarAlCarrito={agregarAlCarrito} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;