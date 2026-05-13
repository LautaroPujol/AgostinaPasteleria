import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Rutas públicas — cualquiera puede ver los productos
router.get('/', getProducts);
router.get('/:pid', getProductById);

// Rutas protegidas — solo el admin con token JWT puede crear, editar o borrar
router.post('/', authMiddleware, createProduct);
router.put('/:pid', authMiddleware, updateProduct);
router.delete('/:pid', authMiddleware, deleteProduct);

export default router;