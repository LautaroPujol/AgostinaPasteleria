import {
  getAllProductsDB,
  getProductByIdDB,
  createProductDB,
  updateProductDB,
  deleteProductDB
} from '../dao/db/ProductManagerDB.js';

import {
  createProductFS,
  updateProductFS,
  deleteProductFS
} from '../dao/fs/ProductManagerFS.js';

// ── GET /api/products ────────────────────────────────────────────────────────
// Devuelve todos los productos con paginación, filtros y ordenamiento
// Ejemplos:
//   /api/products                        → página 1, 10 productos
//   /api/products?page=2&limit=5         → página 2, 5 productos
//   /api/products?query=tortas           → solo categoría "tortas"
//   /api/products?query=true             → solo productos disponibles
//   /api/products?sort=asc               → ordenado por precio, más barato primero
export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    const result = await getAllProductsDB({ limit, page, query, sort });

    // Construimos los links de navegación entre páginas
    // Mantienen todos los filtros activos al pasar de página
    const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;
    const buildLink = (p) => {
      const params = new URLSearchParams({
        limit,
        page: p,
        ...(query && { query }),
        ...(sort && { sort })
      });
      return `${baseUrl}?${params.toString()}`;
    };

    // Formato de respuesta exacto que pide la consigna del curso
    res.json({
      status: 'success',
      payload: result.docs,           // array de productos
      totalPages: result.totalPages,  // total de páginas
      prevPage: result.hasPrevPage ? result.page - 1 : null,
      nextPage: result.hasNextPage ? result.page + 1 : null,
      page: result.page,              // página actual
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.page - 1) : null,
      nextLink: result.hasNextPage ? buildLink(result.page + 1) : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── GET /api/products/:pid ───────────────────────────────────────────────────
// Devuelve un producto específico por su ID de MongoDB
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdDB(req.params.pid);

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── POST /api/products ───────────────────────────────────────────────────────
// Crea un producto nuevo — ruta protegida (solo admin)
export const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Validamos que los campos obligatorios estén presentes
    if (!title || !code || !price) {
      return res.status(400).json({
        status: 'error',
        message: 'title, code y price son obligatorios'
      });
    }

    // Guardamos en MongoDB (fuente principal)
    const newProduct = await createProductDB({
      title, description, code, price, status, stock, category, thumbnails
    });

    // Guardamos también en FileSystem (respaldo — lo pide la consigna)
    await createProductFS({
      title, description, code, price, status, stock, category, thumbnails
    });

    // Emitimos evento de WebSocket para que el frontend se actualice en tiempo real
    // Todos los browsers conectados reciben el nuevo producto sin recargar la página
    req.io.emit('product-created', newProduct);

    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    // Error 11000 = código duplicado (el campo "code" es unique en el modelo)
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Ya existe un producto con ese código'
      });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── PUT /api/products/:pid ───────────────────────────────────────────────────
// Actualiza un producto existente — ruta protegida (solo admin)
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updates = req.body;

    // Nos aseguramos de que nadie pueda cambiar el ID del producto
    delete updates._id;

    const updated = await updateProductDB(pid, updates);

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    // Sincronizamos el FileSystem con los cambios
    await updateProductFS(pid, updates);

    // Notificamos a todos los browsers conectados
    req.io.emit('product-updated', updated);

    res.json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── DELETE /api/products/:pid ────────────────────────────────────────────────
// Elimina un producto — ruta protegida (solo admin)
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deleted = await deleteProductDB(pid);

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    // Sincronizamos el FileSystem
    await deleteProductFS(pid);

    // Notificamos a todos los browsers conectados
    req.io.emit('product-deleted', { id: pid });

    res.json({ status: 'success', payload: deleted });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};