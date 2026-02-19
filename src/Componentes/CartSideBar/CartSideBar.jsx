import React from 'react';
import { Link } from 'react-router-dom';
import "./CartSideBar.css"

// Agregamos 'agregarAlCarrito' y 'restarCantidad' a las props que recibe
const CartSidebar = ({ show, handleClose, cart, total, clearCart, eliminarProducto, agregarAlCarrito, restarCantidad }) => {
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : ''} ${show ? 'carrito-visible' : 'carrito-oculto'}`}
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Tu Pedido 🍰</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>

        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p>El carrito está vacío 😢</p>
          ) : (
            <ul className="list-group">

              {cart.map((producto) => (
                <li key={producto.id} className="list-group-item py-3">

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    {/* 1. Foto y Nombre */}
                    <div className="d-flex align-items-center">
                      <img
                        src={producto.Img}
                        alt={producto.Nombre}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }}
                      />
                      <p className="m-0 fw-bold">{producto.Nombre}</p>
                    </div>

                    {/* 2. Botón Eliminar Todo (Tacho) */}
                    <button
                      className="btn btn-sm text-danger"
                      onClick={() => eliminarProducto(producto.id)}
                      title="Eliminar todo"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* 3. CONTROLES DE CANTIDAD (+ y -) */}
                  <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">

                    {/* Botonera */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary px-2"
                        onClick={() => restarCantidad(producto.id)}
                      >
                        -
                      </button>

                      <span className="mx-3 fw-bold">{producto.cantidad}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary px-2"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="m-0 fw-bold">
                      ${producto.Precio * producto.cantidad}
                    </p>
                  </div>
                </li>
              ))}

            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-3 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Total:</h4>
              <h4 className="TextoSucces fw-bold">${total}</h4>
            </div>
            <button className="btn btn-outline-danger w-100 mb-2" onClick={clearCart}>
              Vaciar Todo 🗑️
            </button>
            <Link to="/checkout" className=" btn btn-dark btn-fin w-100" onClick={handleClose}>
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>

      {show && <div className="offcanvas-backdrop fade show" onClick={handleClose}></div>}
    </>
  );
};

export default CartSidebar;