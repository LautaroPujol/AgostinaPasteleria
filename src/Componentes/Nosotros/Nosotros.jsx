
import { Link } from "react-router-dom"
import "./Nosotros.css"

const Nosotros = () => {
    return (
        <section>
            <div className="Textonosotros">
                <h1 className="h1-nosotros">
                    Nuestra historia
                </h1>
                <img class="separacion" src="/imagenes/separacion-nosotros.png" alt="Imagen separacion"></img>
                <div>
                    <p class="nuetra-historia">
                        Nacimos del amor por la repostería artesanal, creando sabores únicos que alegran cada momento.
                    </p>
                </div>
            </div>
            <div className="d-flex flexs Flexmedia">
                <div>
                    <img className="ImagenNosotros" src="/imagenes/nosotrosimagen.png" alt="Imagen Torta Nosotros Ilustrativa"></img>
                </div>
                <div className="container mt-5  ">

                    <div className="row mb-5">
                        <div className="col-md-5 col-sm-5 col-xs-6 mx-auto">
                            <div className="nuestra-mision">
                                <img src="/imagenes/nuestramision.png" alt="Imagen de nuestra misión ilustrativa"></img>
                                <div>       
                                    <h3>Nuestra Misión</h3>
                                    <hr className="linea-rosa" />
                                    <p className="ps-3 mt-3">Endulzar la vida de nuestros clientes con productos frescos,
                                        creativos y llenos de sabor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-5 col-sm-5 col-xs-6 mx-auto">
                            <div className="nuestra-mision">
                                <img src="/imagenes/nuestravision.png" alt="Imagen de nuestra visión ilustrativa"></img>
                                <div>
                                    <h3>Nuestra Visión</h3>
                                    <hr className="linea-rosa" />
                                    <p className="ps-3 mt-3">Ser reconocidos como una pastelería que endulza la vida de las
                                        personas, innovando con sabores únicos y ofreciendo calidad y pasión en cada
                                        producto</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-5 col-sm-5 col-xs-6 mx-auto">
                            <div className="nuestra-mision">
                                <img src="/imagenes/quehacemos.png" alt="Imagen de qué hacemos ilustrativa"></img>
                                <div>
                                    <h3>Qué Hacemos</h3>
                                    <hr className="linea-rosa" />
                                    <p className="ps-3 mt-3">Creamos delicias dulces y saladas que hacen únicos tus momentos
                                        especiales</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Nosotros