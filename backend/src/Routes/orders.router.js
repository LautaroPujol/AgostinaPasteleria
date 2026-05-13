import { Router } from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = Router();

// Pública — cualquier cliente puede hacer un pedido
router.post('/', createOrder);

export default router;