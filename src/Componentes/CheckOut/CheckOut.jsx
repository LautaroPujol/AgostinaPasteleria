import React, { useState } from 'react';
// IMPORTANTE: Agregamos 'updateDoc' y 'doc' aquí
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../FireBase/Config';
import "./CheckOut.css" 

const Checkout = ({ cart, total, vaciarCarrito }) => {
    const [pedidoId, setPedidoId] = useState("");
    const [mensajeWsp, setMensajeWsp] = useState(""); 

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: ''
    });

    const manejarInput = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    const manejarEnvio = async (event) => {
        event.preventDefault();

        const pedido = {
            cliente: datos,
            productos: cart,
            total: total,
            fecha: new Date()
        };

        try {
            // 1. Guardamos la orden en Firebase
            const pedidosRef = collection(db, "pedidos");
            // Le cambié el nombre a 'docRef' para no confundir con la función 'doc'
            const docRef = await addDoc(pedidosRef, pedido); 
            setPedidoId(docRef.id);

            // --- 2. NUEVO: DESCONTAMOS EL STOCK ---
            await Promise.all(
                cart.map(async (producto) => {
                    // Referencia a la torta específica
                    const productoRef = doc(db, "productos", producto.id);
                    
                    // Calculamos: Stock Actual - Cantidad Comprada
                    // Si 'stock' no existe, asumimos 10. Si 'cantidad' no existe, asumimos 1.
                    const stockActual = producto.stock !== undefined ? producto.stock : 10;
                    const cantidadComprada = producto.cantidad || 1;
                    const nuevoStock = stockActual - cantidadComprada;

                    // Actualizamos en Firebase
                    await updateDoc(productoRef, {
                        stock: nuevoStock
                    });
                })
            );
            // --------------------------------------

            // 3. Armamos el mensaje de WhatsApp
            const telefono = "5493794604291";
            const productosTexto = cart.map(prod => `- ${prod.Nombre} x${prod.cantidad || 1} ($${prod.Precio})`).join('\n');

            const textoMensaje =
                `*¡Hola! Nuevo Pedido Web* 🍰
*ID:* ${docRef.id}
--------------------------------
*Cliente:* ${datos.nombre} ${datos.apellido}
*Teléfono:* ${datos.telefono}
--------------------------------
*Productos:*
${productosTexto}
--------------------------------
*TOTAL: $${total}*`;

            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(textoMensaje)}`;
            setMensajeWsp(url);

            // 4. Vaciamos el carrito
            vaciarCarrito();

        } catch (error) {
            console.error("Error en el pedido:", error);
        }
    };

    // --- PANTALLA DE ÉXITO ---
    if (pedidoId) {
        return (
            <div className="container mt-5 text-center">
                <h2 className="text-success">¡Pedido registrado con éxito! 🍰</h2>
                <p>Tu código de pedido es: <strong>{pedidoId}</strong></p>
                <br />

                <a
                    href={mensajeWsp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-lg"
                >
                    Finalizar compra en WhatsApp 📲
                </a>

                <br /><br />
                <a href="/" className="btn btn-outline-primary">Volver al Inicio</a>
            </div>
        );
    }

    // --- FORMULARIO ---
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Finalizar Compra 🛍️</h2>
            <div className="row">

                <div className="col-md-8">
                    <form onSubmit={manejarEnvio} className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" onChange={manejarInput} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="apellido" onChange={manejarInput} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="number" className="form-control" name="telefono" onChange={manejarInput} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" onChange={manejarInput} required />
                        </div>

                        <button type="submit" className="btn button-confirmarped w-100 mt-3">
                            Confirmar Pedido
                        </button>
                    </form>
                </div>

                <div className="col-md-4">
                    <div className="card p-3 shadow-sm bg-light">
                        <h4 className="mb-3">Resumen</h4>
                        <ul className="list-group mb-3">
                            {cart.map((prod) => (
                                <li key={prod.id} className="list-group-item d-flex justify-content-between">
                                    <span>{prod.Nombre} (x{prod.cantidad || 1})</span>
                                    <span>${prod.Precio * (prod.cantidad || 1)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-between">
                            <strong>Total:</strong>
                            <strong className="TextoSucces">${total}</strong>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;