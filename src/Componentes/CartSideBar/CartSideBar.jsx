import React from 'react';

const CartSidebar = ({ show, handleClose, cart, total, clearCart }) => {
  return (
    <>
      <div 
        className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} 
        tabIndex="-1"
        style={{ visibility: show ? 'visible' : 'hidden' }}
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
              {cart.map((producto, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {producto.Nombre}
                  <span className="badge bg-primary rounded-pill text-light">
                    ${producto.Precio}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-3 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Total:</h4>
              <h4 className="text-success fw-bold">${total}</h4>
            </div>
            <button 
              className="btn btn-outline-danger w-100 mb-2" 
              onClick={clearCart}
            >
              Vaciar Carrito 🗑️
            </button>
            <button 
              className="btn btn-dark w-100" 
              onClick={() => alert('¡Gracias por tu compra!')}
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
      {show && <div className="offcanvas-backdrop fade show" onClick={handleClose}></div>}
    </>
  );
};

export default CartSidebar;