import { useState } from "react";
import { createOrder } from "../../api/Product";
import "./CheckOut.css";

const Checkout = ({ cart, total, vaciarCarrito }) => {
  const [pedidoId, setPedidoId] = useState("");
  const [mensajeWsp, setMensajeWsp] = useState("");
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });

  const manejarInput = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Armamos el objeto del pedido con los datos del cliente y los productos
    const pedido = {
      cliente: datos,
      productos: cart.map((prod) => ({
        productId: prod.id,
        title: prod.Nombre,
        price: prod.Precio,
        quantity: prod.cantidad || 1,
      })),
      total,
    };

    try {
      // Llamamos a la función centralizada — no hay addDoc ni Firebase
      const data = await createOrder(pedido);

      if (data.status === "success") {
        const id = data.payload.id;
        setPedidoId(id);

        // Armamos el mensaje de WhatsApp con el resumen del pedido
        const telefono = "5493794604291";
        const productosTexto = cart
          .map((prod) => `- ${prod.Nombre} x${prod.cantidad || 1} ($${prod.Precio})`)
          .join("\n");

        const textoMensaje =
          `*¡Hola! Nuevo Pedido Web* 🍰\n` +
          `*ID:* ${id}\n` +
          `--------------------------------\n` +
          `*Cliente:* ${datos.nombre} ${datos.apellido}\n` +
          `*Teléfono:* ${datos.telefono}\n` +
          `--------------------------------\n` +
          `*Productos:*\n${productosTexto}\n` +
          `--------------------------------\n` +
          `*TOTAL: $${total}*`;

        setMensajeWsp(
          `https://wa.me/${telefono}?text=${encodeURIComponent(textoMensaje)}`
        );

        // Vaciamos el carrito después de confirmar el pedido
        vaciarCarrito();
      } else {
        alert("Error al registrar el pedido");
      }
    } catch (error) {
      console.error("Error en el pedido:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // ── Pantalla de éxito — se muestra después de confirmar el pedido ──────────
  if (pedidoId) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-success">¡Pedido registrado con éxito! 🍰</h2>
        <p>
          Tu código de pedido es: <strong>{pedidoId}</strong>
        </p>
        <br />
        <a
          href={mensajeWsp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success btn-lg"
        >
          Finalizar compra por WhatsApp 📲
        </a>
        <br />
        <br />
        <a href="/" className="btn btn-outline-primary">
          Volver al Inicio
        </a>
      </div>
    );
  }

  // ── Formulario de checkout ───────────────────────────────────────────────
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Finalizar Compra 🛍️</h2>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={manejarEnvio} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                onChange={manejarInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                onChange={manejarInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="number"
                className="form-control"
                name="telefono"
                onChange={manejarInput}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={manejarInput}
                required
              />
            </div>
            <button
              type="submit"
              className="btn button-confirmarped w-100 mt-3"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Resumen del carrito al lado del formulario */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm bg-light">
            <h4 className="mb-3">Resumen</h4>
            <ul className="list-group mb-3">
              {cart.map((prod) => (
                <li
                  key={prod.id}
                  className="list-group-item d-flex justify-content-between"
                >
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