import { useState, useEffect } from 'react';
import { auth, db } from '../../FireBase/Config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        });

        const productosRef = collection(db, "productos");
        getDocs(productosRef).then((resp) => {
            setProductos(
                resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth);
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés borrar esta torta?");
        if (confirmar) {
            await deleteDoc(doc(db, "productos", id));
            setProductos(productos.filter(prod => prod.id !== id));
        }
    };

    return (
        // CAMBIO 1: Usamos 'container-fluid' y un poco de padding (px-5) para que use todo el ancho
        <div className="container-fluid mt-5 px-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: "#004d55" }}>Panel de Control</h1>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            {/* CAMBIO 2: Sacamos el 'maxWidth' para que la caja crezca todo lo que necesite */}
            <div className="card shadow p-4" style={{ backgroundColor: "#f8f5f0", width: "100%" }}>
                <h3>Mis Productos</h3>
                <hr />
                
                <Link to="/admin/agregar" className="btn mb-3" style={{ backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold", width: "fit-content" }}>
                    + Agregar Nueva Torta
                </Link>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((prod) => (
                                <tr key={prod.id} style={{ verticalAlign: "middle" }}>
                                    <td>
                                        <img src={prod.Img} alt={prod.Nombre} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} />
                                    </td>
                                    <td>{prod.Nombre}</td>
                                    <td>${prod.Precio}</td>
                                    
                                    {/* Columna de Stock */}
                                    <td style={{ fontWeight: "bold", color: prod.stock > 0 ? "green" : "red" }}>
                                        {prod.stock !== undefined ? prod.stock : "Sin definir"}
                                    </td>

                                    <td>
                                        <Link to={`/admin/editar/${prod.id}`} className="btn btn-sm btn-info me-2">
                                            ✏️ Editar
                                        </Link>

                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarProducto(prod.id)}
                                        >
                                            🗑️ Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;