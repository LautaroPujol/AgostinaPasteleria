import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Componentes/NavBar/Navbar';
import Inicio from './Componentes/Inicio/Inicio';
import Nosotros from './Componentes/Nosotros/Nosotros';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import Footer from './Componentes/Footer/Footer';
import CartSidebar from './Componentes/CartSideBar/CartSideBar';
import Notificacion from './Componentes/Notificacion/Notificacion';
import { useCarrito } from './hooks/useCarrito';
import Checkout from './Componentes/CheckOut/CheckOut';
import { HelmetProvider } from 'react-helmet-async';
import { useState } from 'react';
import Login from './Componentes/Login/Login';
import Admin from './Componentes/Admin/Admin';
import EditarProducto from './Componentes/Admin/EditarProducto';
import AgregarProducto from './Componentes/Admin/AgregarProducto';

function App() {

  const {
    carrito, total, mostrarCarrito, mensajeVisible,
    agregarAlCarrito, eliminarProducto, vaciarCarrito,
    manejarApertura, manejarCierre, restarCantidad
  } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* <CargarProductos /> */}
        <Navbar abrirCarrito={manejarApertura} cantidad={carrito.length} manejarBusqueda={setBusqueda} />

        <CartSidebar
          show={mostrarCarrito}
          handleClose={manejarCierre}
          cart={carrito}
          total={total}
          clearCart={vaciarCarrito}
          eliminarProducto={eliminarProducto}
          agregarAlCarrito={agregarAlCarrito}
          restarCantidad={restarCantidad}
        />

        <main className='Flexcrecer'>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/catalogo" element={<ItemListContainer agregarAlCarrito={agregarAlCarrito} busqueda={busqueda} />} />
            <Route path="/checkout" element={<Checkout cart={carrito} total={total} vaciarCarrito={vaciarCarrito} />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/editar/:id" element={<EditarProducto />} />
            <Route path='/admin/agregar/' element={<AgregarProducto />} />
          </Routes>
        </main>

        <Notificacion show={mensajeVisible} text="¡Agregado al carrito! 🍰" />
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;