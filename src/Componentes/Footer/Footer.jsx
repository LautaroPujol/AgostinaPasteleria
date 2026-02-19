import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="Footerflex">
            <p className="p-2">Todos los derechos reservados</p>

            <div className='Imagenes'>
                <Link to="https://www.instagram.com/agostina.pasteleria/" target="_blank" rel="noopener">
                    <img className="imagen-footer " src="/imagenes/logotipoinstagram.png"
                        alt="instagram"></img>
                </Link>
                <Link
                    to="http://qr.afip.gob.ar/?qr=8s6BAcXV2i7PbAFO10hLyw,," target="_F960AFIPInfo" rel="noopener">
                    <img className="imagen-footer" src="/imagenes/datafiscal.jpg " alt="Data Fiscal"></img>
                </Link>

            </div>
        </footer>

    )
}

export default Footer