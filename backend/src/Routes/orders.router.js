import { Router } from 'express';
import { createOrder } from '../controllers/OrderController.js';

const router = Router();

// Pública — cualquier cliente puede hacer un pedido
router.post('/', createOrder);

export default router;