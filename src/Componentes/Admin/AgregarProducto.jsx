import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FireBase/Config";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {
    const [valores, setValores] = useState({
        Nombre: "",
        Precio: "",
        descripcion: "",
        Img: "",
        stock: 15 // Valor inicial sugerido
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validamos que no mande campos vacíos (opcional pero recomendado)
        if(valores.Nombre === "" || valores.Precio === "") {
            alert("Por favor completá el nombre y el precio");
            return;
        }

        // Creamos la referencia a la colección "productos"
        const productosRef = collection(db, "productos");

        // Guardamos en Firebase
        await addDoc(productosRef, {
            Nombre: valores.Nombre,
            Precio: Number(valores.Precio), // Convertimos a número
            descripcion: valores.descripcion,
            Img: valores.Img,
            stock: Number(valores.stock) // Convertimos a número
        });

        // Volvemos al panel
        navigate("/admin");
    };

    return (
        <div className="container mt-5">
            <h2 style={{ color: "#004d55" }}>Agregar Nueva Torta</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow mt-3" style={{ backgroundColor: "#f8f5f0", maxWidth: "600px", margin: "0 auto" }}>
                
                <div className="mb-3">
                    <label className="form-label">Nombre de la Torta</label>
                    <input type="text" className="form-control" name="Nombre" onChange={handleInput} placeholder="Ej: Torta Oreo" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio ($)</label>
                    <input type="number" className="form-control" name="Precio" onChange={handleInput} placeholder="Ej: 5000" required />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold" style={{color: "#004d55"}}>Stock Inicial</label>
                    <input type="number" className="form-control" name="stock" value={valores.stock} onChange={handleInput} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" onChange={handleInput} placeholder="Ingredientes, tamaño, etc." />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL de la Imagen</label>
                    <input type="text" className="form-control" name="Img" onChange={handleInput} placeholder="https://..." />
                    <small className="text-muted">Copiá y pegá el link de la foto aquí.</small>
                </div>

                <button type="submit" className="btn w-100" style={{ backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold" }}>
                    CREAR TORTA
                </button>
            </form>
        </div>
    );
};

export default AgregarProducto;