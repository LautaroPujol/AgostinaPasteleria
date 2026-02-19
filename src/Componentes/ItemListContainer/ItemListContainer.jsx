import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/Config"; 

const ItemListContainer = ({ agregarAlCarrito, busqueda }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((resp) => {
        const productosNuevos = resp.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        });
        setProductos(productosNuevos);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const productosFiltrados = productos.filter((prod) => {
      if (!busqueda) return true;
      return prod.Nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="container">
      <section className="SectionInicio">
        <h1>AGOSTINA PASTELERIA</h1>
        <p>Pasteleria Artesanal</p>
      </section>
      
      <div className="row">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-4">
            <div className="card">
              <div className="card-body d-flex flex-column">
                
                <h3>{prod.Nombre}</h3>
                <img
                  src={prod.Img}
                  alt={prod.Nombre}
                  className="card-img-top"
                />

                <p className="Colorprecio">${prod.Precio}</p>
                <p className="fw-light">{prod.descripcion}</p>
                
                {/* --- LÓGICA DE STOCK AGREGADA AQUÍ --- */}
                {/* Si el stock es mayor a 0 (o indefinido), mostramos el botón de compra */}
                {(prod.stock > 0 || prod.stock === undefined) ? (
                    <button className="BotonCatalogo" onClick={() => agregarAlCarrito(prod)}>
                        Comprar
                    </button>
                ) : (
                    /* Si es 0, mostramos botón deshabilitado */
                    <button 
                        className="BotonCatalogo" 
                        disabled 
                        style={{ backgroundColor: '#f2a88d', borderColor: '#ccc', cursor: 'not-allowed', color: '#f8f5f0' }}
                    >
                        Sin Stock 🚫
                    </button>
                )}
                {/* -------------------------------------- */}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;