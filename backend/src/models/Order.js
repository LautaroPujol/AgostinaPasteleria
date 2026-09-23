import mongoose from 'mongoose';

// Definimos la estructura de un pedido (orden de compra)
// Se crea cuando el cliente completa el formulario del CheckOut
const orderSchema = new mongoose.Schema(
  {
    // Datos del cliente que hizo el pedido
    // Vienen del formulario de CheckOut (nombre, apellido, teléfono, email)
    cliente: {
      nombre: String,
      apellido: String,
      telefono: String,
      email: String,
    },

    // Lista de productos comprados
    // Guardamos una "foto" del producto al momento de la compra:
    // title, price y quantity. No usamos referencia (ObjectId) porque
    // si el producto cambia de precio después, el pedido debe conservar
    // el precio original al momento de la compra
    productos: [
      {
        productId: String,  // ID del producto en MongoDB
        title: String,      // Nombre del producto al momento de la compra
        price: Number,      // Precio al momento de la compra
        quantity: Number,   // Cantidad comprada
      },
    ],

    // Total de la orden en pesos
    total: { type: Number, required: true },

    // Fecha del pedido (se guarda automáticamente al crear)
    fecha: { type: Date, default: Date.now },
  },
  {
    // Agrega createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;