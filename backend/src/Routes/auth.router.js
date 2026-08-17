import { Router } from 'express';
import { login, logout } from '../controllers/AuthController.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;