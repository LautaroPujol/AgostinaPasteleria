import mongoose from 'mongoose';

// Definimos la estructura de un carrito de compras
const cartSchema = new mongoose.Schema(
  {
    // Un carrito tiene un array de productos
    // Cada item del array tiene:
    //   - product: referencia al ID del producto (relación con la colección Product)
    //   - quantity: cuántas unidades de ese producto hay en el carrito
    products: [
      {
        // ObjectId que apunta a un documento de la colección "products"
        // Esto es lo que permite usar .populate() para traer los datos completos
        // del producto cuando consultamos el carrito
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // nombre del modelo al que hace referencia
          required: true,
        },

        // Cantidad de ese producto en el carrito
        // Por defecto es 1 cuando se agrega por primera vez
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    // Agrega createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;