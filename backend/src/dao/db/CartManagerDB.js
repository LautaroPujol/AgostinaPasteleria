import Cart from '../../models/Cart.js';

// ── CRUD de carritos con MongoDB ─────────────────────────────────────────────

// Crea un carrito nuevo vacío
// Se llama cuando el usuario entra al sitio por primera vez
export const createCartDB = async () => {
  const cart = new Cart({ products: [] });
  return await cart.save();
};

// Devuelve un carrito por su ID con los datos completos de cada producto
// .populate('products.product') reemplaza el ObjectId por el documento completo
// de Product — así el frontend recibe title, price, thumbnails, etc.
export const getCartByIdDB = async (id) => {
  return await Cart.findById(id).populate('products.product').lean();
};

// Agrega un producto al carrito
// Si el producto ya estaba en el carrito, solo incrementa la cantidad en 1
// Si es nuevo, lo agrega con quantity: 1
export const addProductToCartDB = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) return null;

  // Buscamos si el producto ya existe en el carrito
  const existingItem = cart.products.find(
    item => item.product.toString() === productId
    // .toString() porque item.product es un ObjectId, no un string
  );

  if (existingItem) {
    // Ya existe → solo sumamos 1 a la cantidad
    existingItem.quantity += 1;
  } else {
    // No existe → lo agregamos con quantity 1
    cart.products.push({ product: productId, quantity: 1 });
  }

  return await cart.save();
};

// Elimina un producto específico del carrito
// Usa .filter() para quedarse con todos los productos EXCEPTO el que queremos borrar
export const removeProductFromCartDB = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) return null;

  cart.products = cart.products.filter(
    item => item.product.toString() !== productId
  );

  return await cart.save();
};

// Reemplaza TODOS los productos del carrito con un array nuevo
// Se usa en PUT /api/carts/:cid cuando querés sincronizar el carrito completo
export const updateCartDB = async (cartId, products) => {
  return await Cart.findByIdAndUpdate(
    cartId,
    { products },
    { new: true } // devuelve el carrito ya actualizado
  );
};

// Actualiza únicamente la cantidad de un producto específico dentro del carrito
// Se usa en PUT /api/carts/:cid/products/:pid
export const updateProductQuantityDB = async (cartId, productId, quantity) => {
  const cart = await Cart.findById(cartId);
  if (!cart) return null;

  // Buscamos el item específico dentro del array de productos
  const item = cart.products.find(
    item => item.product.toString() === productId
  );
  if (!item) return null;

  // Actualizamos solo la cantidad
  item.quantity = quantity;

  return await cart.save();
};

// Vacía el carrito completo (borra todos los productos pero mantiene el carrito)
// Se usa en DELETE /api/carts/:cid
export const clearCartDB = async (cartId) => {
  return await Cart.findByIdAndUpdate(
    cartId,
    { products: [] }, // reemplazamos con array vacío
    { new: true }
  );
};