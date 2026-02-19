import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Ahora recibimos 'manejarBusqueda' para poder enviar lo que escribe el usuario
const Navbar = ({ abrirCarrito, manejarBusqueda }) => {

    const location = useLocation(); // Activamos el sensor de ruta

    return (
        <nav className="navbar navbar-expand-lg ColorNavbar">
            <div className="container-fluid">
                {/* LOGO */}
                <Link to="/">
                    <img className='ImgLogo' src="/imagenes/AgostinaPasteleriaLogo.png" alt="Logo AgostinaPasteleria" />
                </Link>

                {/* BOTÓN HAMBURGUESA (Móvil) */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuAgostina"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuAgostina">

                    {/* --- INICIO ZONA BUSCADOR --- */}
                    {/* Si la ruta es '/catalogo', mostramos el input en el medio */}
                    {location.pathname === '/catalogo' && (
                        <div className="d-flex mx-auto buscador" >
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="🔍 Buscar torta..."
                                aria-label="Search"
                                // Aquí enviamos el texto a App.jsx cada vez que escribis
                                onChange={(e) => manejarBusqueda(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Si NO estamos en catalogo, ponemos un espacio invisible para que los links no se muevan */}
                    {location.pathname !== '/catalogo' && <div className="mx-auto"></div>}
                    {/* --- FIN ZONA BUSCADOR --- */}

                    {/* TUS LINKS (A la derecha) */}
                    <ul className="navbar-nav mb-2 mb-lg-0 TextoNavbar media">
                        <li className="nav-item">
                            <Link className="nav-link transform" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link transform" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link transform" to="/catalogo">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            {/* Icono del Carrito */}
                            <span className="nav-link transform" onClick={abrirCarrito} style={{ cursor: 'pointer' }}>
                                <img className='ImagenCarrito' src="/imagenes/ImgCartWidget.png" alt="Imagen carrito de compra" />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar