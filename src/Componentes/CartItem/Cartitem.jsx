import "./CartItem.css"
const CartItem = ({ producto, index, eliminarProducto }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{producto.Nombre}</span>
            <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary rounded-pill ColorPrecioCarrito">
                    ${producto.Precio}
                </span>

                <button
                    className="btn btn-danger btn-sm button-eliminar"
                    onClick={() => eliminarProducto(index)}
                    title="Eliminar producto"
                >
                    X
                </button>
            </div>

        </li>
    );
};

export default CartItem;