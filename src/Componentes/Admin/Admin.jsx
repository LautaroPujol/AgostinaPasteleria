import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// Importamos las funciones centralizadas de api/products.js
import { fetchProducts, deleteProduct } from "../../api/Product";
import { removeToken, isAuthenticated } from "../../api/Config";
import "./Admin.css";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay token guardado, redirigimos al login directamente
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Traemos todos los productos del backend
    fetchProducts()
      .then((data) => {
        if (data.status === "success") {
          // Mapeamos igual que en ItemListContainer para mantener consistencia
          setProductos(
            data.payload.map((prod) => ({
              id: prod._id,
              Nombre: prod.title,
              Precio: prod.price,
              Img: prod.thumbnails?.[0] || "",
              stock: prod.stock,
            }))
          );
        }
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    // Borramos el token de localStorage y redirigimos al login
    removeToken();
    navigate("/login");
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que querés borrar esta torta?");
    if (!confirmar) return;

    // Llamamos a la función centralizada que ya maneja el token internamente
    const data = await deleteProduct(id);

    if (data.status === "success") {
      // Actualizamos el estado local para que desaparezca de la tabla sin recargar
      setProductos(productos.filter((prod) => prod.id !== id));
    } else {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: "#004d55" }}>Panel de Control</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="card shadow p-4" style={{ backgroundColor: "#f8f5f0", width: "100%" }}>
        <h3>Mis Productos</h3>
        <hr />
        <Link
          to="/admin/agregar"
          className="btn mb-3"
          style={{
            backgroundColor: "#f2a88d",
            color: "#004d55",
            fontWeight: "bold",
            width: "fit-content",
          }}
        >
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
                    <img
                      src={prod.Img}
                      alt={prod.Nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{prod.Nombre}</td>
                  <td>${prod.Precio}</td>
                  <td style={{ fontWeight: "bold", color: prod.stock > 0 ? "green" : "red" }}>
                    {prod.stock}
                  </td>
                  <td>
                    <Link
                      to={`/admin/editar/${prod.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
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