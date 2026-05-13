import { API_URL, getToken } from './config';

// ── Productos públicos ───────────────────────────────────────────────────────

// Trae todos los productos del catálogo
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/api/products?limit=100`);
  return await res.json();
};

// Trae un producto por su ID
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  return await res.json();
};

// ── Productos admin (requieren token JWT) ────────────────────────────────────

// Crea un producto nuevo
export const createProduct = async (productData) => {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
};

// Actualiza un producto existente
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
};

// Elimina un producto
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return await res.json();
};

// ── Auth ─────────────────────────────────────────────────────────────────────

// Login del admin
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
};

// ── Pedidos ──────────────────────────────────────────────────────────────────

// Crea un pedido nuevo (checkout)
export const createOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await res.json();
};