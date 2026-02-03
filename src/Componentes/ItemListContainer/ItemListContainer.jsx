import { useEffect, useState } from "react";
import { pedirProductos } from "../../Stock";
import "./ItemListContainer.css"

const ItemListContainer = ({agregarAlCarrito}) => {
  // 1. Estado inicial: Un array vacío [] esperando los datos
  const [productos, setProductos] = useState([]);

  // 2. Efecto: Se ejecuta una sola vez al entrar
  useEffect(() => {

    // Llamamos a tu función (la promesa de 2 segundos)
    pedirProductos()
      .then((res) => {
        // Cuando llega la respuesta (res), la guardamos en la caja
        setProductos(res);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);


  return (
    <div className="container">
         <section className="SectionInicio"><h1>
                AGOSTINA PASTELERIA
            </h1>
            <p>
                Pasteleria Artesanal
            </p>
            </section>
      <div className="row">

        {/* Recorremos la lista de productos */}
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-4">
            <div className="card">
              <div className="card-body d-flex flex-column">
                {/* OJO: prod.Nombre */}
                <h3>{prod.Nombre}</h3>
                {/* OJO: Acá usamos prod.Img (con Mayúscula) */}
                <img
                  src={prod.Img}
                  alt={prod.Nombre}
                  className="card-img-top"
                />




                {/* OJO: prod.Precio */}
                <p className="Colorprecio">${prod.Precio}</p>
                <p className="fw-light">{prod.descripcion}</p>

                <button className="BotonCatalogo" onClick={() => agregarAlCarrito(prod)}>Comprar</button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ItemListContainer;