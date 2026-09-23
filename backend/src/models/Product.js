import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definimos la estructura de cada producto en la base de datos
const productSchema = new mongoose.Schema(
  {
    // Nombre del producto — ej: "Torta Oreo"
    // En Firebase esto se llamaba "Nombre", acá lo renombramos a "title"
    // para seguir el estándar de la consigna del curso
    title: { type: String, required: true },

    // Descripción larga — ej: "Húmeda por dentro con ganache..."
    // En Firebase esto se llamaba "descripcion"
    description: { type: String, default: '' },

    // Código único del producto — ej: "torta-oreo-001"
    // Lo generamos automáticamente en el controller al crear un producto
    code: { type: String, required: true, unique: true },

    // Precio en pesos — ej: 8500
    // En Firebase esto se llamaba "Precio"
    price: { type: Number, required: true },

    // Si el producto está activo o no (true = disponible)
    status: { type: Boolean, default: true },

    // Cantidad disponible en stock
    // Si llega a 0, el frontend muestra el botón "Sin Stock"
    stock: { type: Number, default: 10 },

    // Categoría — ej: "tortas", "cupcakes", "cheesecakes"
    // Sirve para filtrar con GET /api/products?query=tortas
    category: { type: String, default: 'general' },

    // Array de URLs de imágenes
    // En Firebase esto se llamaba "Img" (un string solo)
    // Acá es un array para poder tener varias fotos por producto
    thumbnails: { type: [String], default: [] },
  },
  {
    // timestamps: true agrega automáticamente los campos:
    // createdAt (fecha de creación) y updatedAt (fecha de última modificación)
    timestamps: true,
  }
);

// Este plugin agrega el método .paginate() al modelo
// Lo usamos en el controller para hacer GET /api/products?page=1&limit=10
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;