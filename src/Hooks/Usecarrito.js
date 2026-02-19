import { useState } from 'react';

export const useCarrito = () => {

  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const total = carrito.reduce((acc, prod) => acc + (prod.Precio * prod.cantidad), 0);

  const agregarAlCarrito = (productoNuevo) => {
    const existe = carrito.find((prod) => prod.id === productoNuevo.id);
    if (existe) {
      const carritoActualizado = carrito.map((prod) => {
        if (prod.id === productoNuevo.id) {
          return { ...prod, cantidad: prod.cantidad + 1 };
        } else {
          return prod;
        }
      });
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...productoNuevo, cantidad: 1 }]);
    }
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 2000);
  };

  // --- NUEVA FUNCIÓN: RESTAR CANTIDAD ---
  const restarCantidad = (id) => {
    const carritoActualizado = carrito.map((prod) => {
      if (prod.id === id) {
        return { ...prod, cantidad: prod.cantidad - 1 }; // Restamos 1
      }
      return prod;
    }).filter((prod) => prod.cantidad > 0); // Si llega a 0, el filter lo elimina solo
    
    setCarrito(carritoActualizado);
  };
  // --------------------------------------

  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((prod) => prod.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);
  const manejarApertura = () => setMostrarCarrito(true);
  const manejarCierre = () => setMostrarCarrito(false);

  return {
    carrito,
    total,
    mostrarCarrito,
    mensajeVisible,
    agregarAlCarrito,
    restarCantidad, // <--- NO TE OLVIDES DE AGREGAR ESTO ACÁ
    eliminarProducto,
    vaciarCarrito,
    manejarApertura,
    manejarCierre
  };
};