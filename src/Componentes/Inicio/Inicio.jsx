import { Link } from "react-router-dom"
import './Inicio.css'
import { Helmet } from "react-helmet-async";



const Inicio = () => {
    return (
        <><Helmet>
            <title>Agostina Pastelería | Tortas Artesanales en Corrientes</title>
            <meta name="description" content="Las mejores tortas artesanales de Corrientes. Torta Matilda, Rogel, Lemon Pie y más. ¡Haz tu pedido por WhatsApp!" />
            <meta name="keywords" content="pasteleria, tortas, corrientes, agostina pasteleria, repostería" />
        </Helmet>
            <main>
                <section className="SectionInicio">
                    <h1>
                        AGOSTINA PASTELERIA
                    </h1>
                    <p>
                        Pasteleria Artesanal
                    </p>
                </section>

                <div className="container-fluid Media">
                    <img className="ImagenInicio " src="/imagenes/tortainicio.png" alt="Imagen inicio ilustrativa"></img>
                    <div className="TextoInicio">
                        <h2 className="font-h2">Descubrí un nuevo sabor</h2>
                        <p className="font-p">en nuestro</p>
                        <Link to="/catalogo" className="div-section-button">Catálogo</Link>
                    </div>
                </div>




            </main>
        </>
    )
}

export default Inicio