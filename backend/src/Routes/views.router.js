import { Router } from 'express';
import {
  renderProducts,
  renderProductDetail,
  renderCart
} from '../controllers/viewsController.js';

const router = Router();

// Vista listado de productos con paginación
router.get('/products', renderProducts);

// Vista detalle de un producto
router.get('/products/:pid', renderProductDetail);

// Vista de un carrito específico
router.get('/carts/:cid', renderCart);

export default router;