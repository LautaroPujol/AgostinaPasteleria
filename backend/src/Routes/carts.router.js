import { Router } from 'express';
import {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductQuantity,
  clearCart
} from '../controllers/cartController.js';

const router = Router();

// Todas públicas — cualquier usuario puede manejar su carrito
router.post('/', createCart);
router.get('/:cid', getCart);
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);

export default router;