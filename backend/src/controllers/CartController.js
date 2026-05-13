import {
  createCartDB,
  getCartByIdDB,
  addProductToCartDB,
  removeProductFromCartDB,
  updateCartDB,
  updateProductQuantityDB,
  clearCartDB
} from '../dao/db/CartManagerDB.js';

// ── POST /api/carts ──────────────────────────────────────────────────────────
// Crea un carrito nuevo vacío
// Se llama cuando el usuario entra al sitio por primera vez
// Devuelve el ID del carrito que el frontend guarda en localStorage
export const createCart = async (req, res) => {
  try {
    const cart = await createCartDB();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── GET /api/carts/:cid ──────────────────────────────────────────────────────
// Devuelve el carrito con los datos completos de cada producto (populate)
// En vez de devolver solo el ID del producto, devuelve title, price, thumbnails, etc.
export const getCart = async (req, res) => {
  try {
    const cart = await getCartByIdDB(req.params.cid);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── POST /api/carts/:cid/products/:pid ──────────────────────────────────────
// Agrega un producto al carrito
// Si el producto ya estaba, incrementa la cantidad en 1
// Si es nuevo, lo agrega con quantity: 1
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await addProductToCartDB(cid, pid);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── DELETE /api/carts/:cid/products/:pid ────────────────────────────────────
// Elimina un producto específico del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await removeProductFromCartDB(cid, pid);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── PUT /api/carts/:cid ──────────────────────────────────────────────────────
// Reemplaza TODOS los productos del carrito con un array nuevo
// El body debe ser: { "products": [ { "product": "id", "quantity": 2 }, ... ] }
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await updateCartDB(cid, products);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── PUT /api/carts/:cid/products/:pid ───────────────────────────────────────
// Actualiza únicamente la cantidad de un producto específico dentro del carrito
// El body debe ser: { "quantity": 3 }
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await updateProductQuantityDB(cid, pid, quantity);

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Carrito o producto no encontrado'
      });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// ── DELETE /api/carts/:cid ───────────────────────────────────────────────────
// Vacía el carrito completo — borra todos los productos pero mantiene el carrito
// Se llama después de que el cliente confirma el pedido en el CheckOut
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await clearCartDB(cid);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};