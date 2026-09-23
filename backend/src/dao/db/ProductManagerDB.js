import Product from '../../models/Product.js';

// ── CRUD con MongoDB usando Mongoose ─────────────────────────────────────────

// Devuelve todos los productos con soporte de:
//   - limit: cuántos resultados por página (default 10)
//   - page: qué página mostrar (default 1)
//   - query: filtro por categoría ("tortas") o disponibilidad ("true"/"false")
//   - sort: orden por precio — "asc" = más barato primero, "desc" = más caro primero
export const getAllProductsDB = async ({ limit = 10, page = 1, query, sort }) => {
  // Construimos el objeto de filtro para MongoDB
  const filter = {};

  if (query) {
    // Si query es "true" o "false", filtramos por disponibilidad (campo status)
    if (query === 'true' || query === 'false') {
      filter.status = query === 'true';
    } else {
      // Si es cualquier otro texto, filtramos por categoría
      // ej: ?query=tortas → trae solo los de category: "tortas"
      filter.category = query;
    }
  }

  // Construimos el objeto de ordenamiento
  // { price: 1 } = ascendente (más barato primero)
  // { price: -1 } = descendente (más caro primero)
  const sortOption = sort === 'asc'
    ? { price: 1 }
    : sort === 'desc'
      ? { price: -1 }
      : {}; // sin sort = orden de inserción

  // .paginate() viene del plugin mongoose-paginate-v2 que agregamos al modelo
  // Devuelve un objeto con: docs, totalPages, hasPrevPage, hasNextPage, etc.
  const result = await Product.paginate(filter, {
    page: Number(page),
    limit: Number(limit),
    sort: sortOption,
    lean: true // devuelve objetos JS planos en vez de documentos Mongoose (más rápido)
  });

  return result;
};

// Busca un producto por su _id de MongoDB
export const getProductByIdDB = async (id) => {
  return await Product.findById(id).lean();
};

// Crea un producto nuevo en MongoDB
export const createProductDB = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Actualiza un producto por su _id y devuelve el documento ya actualizado
// { new: true } es importante: sin eso devuelve el documento ANTES del update
export const updateProductDB = async (id, updates) => {
  return await Product.findByIdAndUpdate(id, updates, { new: true });
};

// Elimina un producto por su _id y devuelve el documento eliminado
export const deleteProductDB = async (id) => {
  return await Product.findByIdAndDelete(id);
};