import { useContext } from "react";
import { CartContext } from "../../Context/Context.jsx";
import './Carrito.css';

const Carrito = () => {
    const { carrito, precioTotal, vaciarCarrito, eliminarItem } = useContext(CartContext);  
    
    return (
        <div className="cart-overlay">
            <div className="cart-sidebar">
                
                {/* ENCABEZADO */}
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h4 className="m-0 fw-bold">Tu Pedido 🍰</h4>
                    <button onClick={cerrarCarrito} className="btn btn-close"></button>
                </div>

                {/* LISTA DE PRODUCTOS */}
                <div className="cart-body">
                    {carrito.length === 0 ? (
                        <div className="text-center mt-5">
                            <h4>😢</h4>
                            <p>No hay productos todavía.</p>
                        </div>
                    ) : (
                        carrito.map((prod) => (
                            <div key={prod.id} className="d-flex align-items-center mb-3 border-bottom pb-3">
                                {/* Imagen */}
                                <img src={prod.Img} alt={prod.Nombre} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px'}} />
                                
                                {/* Datos */}
                                <div className="ms-3 flex-grow-1">
                                    <h6 className="fw-bold mb-0">{prod.Nombre}</h6>
                                    <small>Cant: {prod.cantidad}</small>
                                    <div className="fw-bold">${prod.Precio * prod.cantidad}</div>
                                </div>

                                {/* Botón Eliminar */}
                                <button className="btn btn-sm text-danger" onClick={() => eliminarItem(prod.id)}>
                                    ✕
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* TOTAL Y BOTONES */}
                {carrito.length > 0 && (
                    <div className="p-3 bg-light border-top">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fs-5 fw-bold">Total:</span>
                            <span className="total-text">${precioTotal()}</span>
                        </div>
                        <button className="btn btn-dark w-100 mb-2">FINALIZAR COMPRA</button>
                        <button className="btn btn-outline-danger w-100 btn-sm" onClick={vaciarCarrito}>
                            Vaciar Carrito
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carrito;