import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FireBase/Config";

const EditarProducto = () => {
    const [valores, setValores] = useState({
        Nombre: "",
        Precio: 0,
        descripcion: "",
        Img: "",
        stock: 0 // <--- NUEVO CAMPO IMPORTANTE
    });
    
    const { id } = useParams(); // Capturamos el ID de la torta desde la URL
    const navigate = useNavigate();

    // 1. TRAER LOS DATOS ACTUALES DE LA TORTA
    useEffect(() => {
        const productoRef = doc(db, "productos", id);
        getDoc(productoRef).then((doc) => {
            // Si la torta ya tiene stock, lo usa. Si no, le pone 10 por defecto para empezar.
            const data = doc.data();
            setValores({ 
                ...data, 
                stock: data.stock !== undefined ? data.stock : 10 
            });
        });
    }, [id]);

    // 2. MANEJAR LOS CAMBIOS EN LOS INPUTS
    const handleInput = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    };

    // 3. GUARDAR LOS CAMBIOS EN FIREBASE
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productoRef = doc(db, "productos", id);
        
        await updateDoc(productoRef, {
            Nombre: valores.Nombre,
            Precio: Number(valores.Precio),
            descripcion: valores.descripcion,
            Img: valores.Img,
            stock: Number(valores.stock) // Guardamos el stock como número
        });

        navigate("/admin"); // Volvemos al panel
    };

    return (
        <div className="container mt-5">
            <h2 style={{ color: "#004d55" }}>Editar Torta</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow mt-3" style={{ backgroundColor: "#f8f5f0" }}>
                
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="Nombre" value={valores.Nombre} onChange={handleInput} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio ($)</label>
                    <input type="number" className="form-control" name="Precio" value={valores.Precio} onChange={handleInput} />
                </div>

                {/* --- AQUÍ ESTÁ EL CONTROL DE STOCK --- */}
                <div className="mb-3">
                    <label className="form-label fw-bold" style={{color: "#004d55"}}>Stock Disponible</label>
                    <input type="number" className="form-control" name="stock" value={valores.stock} onChange={handleInput} />
                    <small className="text-muted">Si pones 0, la torta aparecerá como "Sin Stock".</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" value={valores.descripcion} onChange={handleInput} />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL de Imagen</label>
                    <input type="text" className="form-control" name="Img" value={valores.Img} onChange={handleInput} />
                </div>

                <button type="submit" className="btn" style={{ backgroundColor: "#f2a88d", color: "#004d55", fontWeight: "bold" }}>
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditarProducto;