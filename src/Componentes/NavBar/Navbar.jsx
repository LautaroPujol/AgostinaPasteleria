import Agostinapastelerialogo from '/imagenes/Agostinapastelerialogo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = ({ abrirCarrito }) => {
    return (
        <nav className="navbar navbar-expand-lg  ColorNavbar">
            <div className="container-fluid">
                <Link to="/"><img className='ImgLogo' src={Agostinapastelerialogo} alt="Logo AgostinaPasteleria" /> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuAgostina"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menuAgostina">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 TextoNavbar media">
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
                            <span className="nav-link transform" onClick={abrirCarrito}><img className='ImagenCarrito' src="/AgostinaPasteleria/imagenes/ImgCartWidget.png" alt="Imagen carrito de compra" /></span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar