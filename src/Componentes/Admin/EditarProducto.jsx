import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../api/Product";
import "./EditarProducto.css";

const EditarProducto = () => {
  const [valores, setValores] = useState({
    Nombre: "",
    Precio: 0,
    descripcion: "",
    Img: "",
    stock: 0,
  });

  // useParams nos da el :id de la URL — ej: /admin/editar/6657abc123
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Al cargar el componente traemos los datos actuales del producto
    // para pre-rellenar el formulario con los valores existentes
    fetchProductById(id)
      .then((data) => {
        if (data.status === "success") {
          const prod = data.payload;
          setValores({
            Nombre: prod.title,
            Precio: prod.price,
            descripcion: prod.description,
            Img: prod.thumbnails?.[0] || "",
            stock: prod.stock ?? 0,
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleInput = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Llamamos a la función centralizada que ya maneja el token internamente
    const data = await updateProduct(id, {
      title: valores.Nombre,
      price: Number(valores.Precio),
      description: valores.descripcion,
      stock: Number(valores.stock),
      // thumbnails es un array — si hay imagen la metemos en un array
      thumbnails: valores.Img ? [valores.Img] : [],
    });

    if (data.status === "success") {
      // Redirigimos al panel admin cuando se guarda correctamente
      navigate("/admin");
    } else {
      alert("Error al guardar cambios: " + data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#004d55" }}>Editar Torta</h2>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mt-3"
        style={{ backgroundColor: "#f8f5f0" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="Nombre"
            value={valores.Nombre}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio ($)</label>
          <input
            type="number"
            className="form-control"
            name="Precio"
            value={valores.Precio}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={valores.stock}
            onChange={handleInput}
          />
          <small className="text-muted">
            Si ponés 0 la torta aparece como "Sin Stock" en el catálogo.
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={valores.descripcion}
            onChange={handleInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de Imagen</label>
          <input
            type="text"
            className="form-control"
            name="Img"
            value={valores.Img}
            onChange={handleInput}
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold" }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;