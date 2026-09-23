import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// En módulos ES6 no existe __dirname, así que lo recreamos manualmente
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta al archivo JSON donde se guardan los productos como respaldo
// Queda en: backend/data/products.json
const FILE_PATH = path.join(__dirname, '../../../data/products.json');

// ── Funciones internas de lectura/escritura ──────────────────────────────────

// Se asegura de que el archivo exista antes de intentar leerlo.
// Si no existe, lo crea vacío con un array []
const initFile = async () => {
  try {
    await fs.access(FILE_PATH); // intenta acceder al archivo
  } catch {
    // Si tira error es porque no existe → lo creamos
    await fs.writeFile(FILE_PATH, JSON.stringify([]));
  }
};

// Lee el archivo JSON y devuelve el array de productos
const readFile = async () => {
  await initFile();
  const data = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

// Sobreescribe el archivo JSON con el array actualizado
const writeFile = async (data) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

// Genera un ID único basado en el timestamp actual
const generateId = () => Date.now().toString();

// ── CRUD con FileSystem ──────────────────────────────────────────────────────

// Devuelve todos los productos del archivo JSON
export const getAllProductsFS = async () => {
  return await readFile();
};

// Busca un producto por su ID en el archivo JSON
export const getProductByIdFS = async (id) => {
  const products = await readFile();
  return products.find(p => p.id === id) || null;
};

// Agrega un producto nuevo al archivo JSON
export const createProductFS = async (productData) => {
  const products = await readFile();
  const newProduct = { id: generateId(), ...productData };
  products.push(newProduct);
  await writeFile(products);
  return newProduct;
};

// Actualiza un producto existente en el archivo JSON
export const updateProductFS = async (id, updates) => {
  const products = await readFile();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null; // no encontrado
  products[index] = { ...products[index], ...updates, id }; // nunca pisamos el id
  await writeFile(products);
  return products[index];
};

// Elimina un producto del archivo JSON
export const deleteProductFS = async (id) => {
  const products = await readFile();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null; // no encontrado
  const deleted = products.splice(index, 1)[0]; // lo saca del array y lo guarda
  await writeFile(products);
  return deleted;
};