import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/Product";

const AgregarProducto = () => {
  const [valores, setValores] = useState({
    Nombre: "",
    Precio: "",
    descripcion: "",
    Img: "",
    stock: 15,
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valores.Nombre || !valores.Precio) {
      alert("Por favor completá el nombre y el precio");
      return;
    }

    // Generamos un código único a partir del nombre + timestamp
    // Ej: "Torta Oreo" → "torta-oreo-1234567890"
    const code = valores.Nombre.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

    // Llamamos a la función centralizada que ya maneja el token internamente
    const data = await createProduct({
      title: valores.Nombre,
      description: valores.descripcion,
      code,
      price: Number(valores.Precio),
      stock: Number(valores.stock),
      status: true,
      category: "tortas",
      // thumbnails es un array — mandamos la URL de la imagen dentro de un array
      thumbnails: valores.Img ? [valores.Img] : [],
    });

    if (data.status === "success") {
      // Redirigimos al panel admin cuando se crea correctamente
      navigate("/admin");
    } else {
      alert("Error al crear el producto: " + data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#004d55" }}>Agregar Nueva Torta</h2>
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow mt-3"
        style={{ backgroundColor: "#f8f5f0", maxWidth: "600px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Nombre de la Torta</label>
          <input
            type="text"
            className="form-control"
            name="Nombre"
            onChange={handleInput}
            placeholder="Ej: Torta Oreo"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio ($)</label>
          <input
            type="number"
            className="form-control"
            name="Precio"
            onChange={handleInput}
            placeholder="Ej: 5000"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Inicial</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={valores.stock}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            onChange={handleInput}
            placeholder="Ingredientes, tamaño, etc."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL de la Imagen</label>
          <input
            type="text"
            className="form-control"
            name="Img"
            onChange={handleInput}
            placeholder="http://localhost:8080/images/mitorca.png"
          />
          <small className="text-muted">
            Subí la imagen a backend/public/images/ y pegá la URL acá.
          </small>
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold" }}
        >
          CREAR TORTA
        </button>
      </form>
    </div>
  );
};

export default AgregarProducto;