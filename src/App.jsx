import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componentes/NavBar/Navbar';
import Inicio from './Componentes/Inicio/Inicio';
import Nosotros from './Componentes/Nosotros/Nosotros';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import Footer from './Componentes/Footer/Footer';
import CartSidebar from './Componentes/CartSideBar/CartSideBar';
import Notificacion from './Componentes/Notificacion/Notificacion';

function App() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const total = carrito.reduce((acumulador, producto) => acumulador + producto.Precio, 0);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const agregarAlCarrito = (productoNuevo) => {
    setCarrito([...carrito, productoNuevo]);
    setMensajeVisible(true); 
    setTimeout(() => {
      setMensajeVisible(false);
    }, 2000);
  };
  const vaciarCarrito = () => {
    setCarrito([]); 
  };

  const manejarApertura = () => setMostrarCarrito(true);
  const manejarCierre = () => setMostrarCarrito(false);

  return (
    <BrowserRouter>
      <Navbar abrirCarrito={manejarApertura} cantidad={carrito.length} />
      <CartSidebar 
        show={mostrarCarrito} 
        handleClose={manejarCierre} 
        cart={carrito} 
        total={total} 
        clearCart={vaciarCarrito} 
      />
      <Routes>
        <Route path="/AgostinaPasteleria/" element={<Inicio />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route
          path="/catalogo"
          element={<ItemListContainer agregarAlCarrito={agregarAlCarrito} />}
        />
      </Routes>
     <Notificacion show={mensajeVisible} text="¡Agregado al carrito! 🍰" />
      <Footer />
    </BrowserRouter>
    
    
  );
}

export default App;