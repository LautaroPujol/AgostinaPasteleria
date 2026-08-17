import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Importamos todos los routers API
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import authRouter from './routes/auth.router.js';
import ordersRouter from './routes/orders.router.js';
import viewsRouter from './routes/views.router.js';

import { socketMiddleware } from './middleware/socket.js';

dotenv.config();


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// ── Configuración de Handlebars ──────────────────────────────────────────────
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// Le decimos a Express dónde están las vistas
app.set('views', path.join(__dirname, 'views'));

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(socketMiddleware(io));

// Servimos archivos estáticos desde public/
// Las imágenes: http://localhost:8080/images/tortachaja.png
// El CSS:       http://localhost:8080/css/styles.css
app.use(express.static(path.join(__dirname, '../public')));

// ── WebSockets ───────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// ── Rutas de vistas (Handlebars) ─────────────────────────────────────────────
app.use('/', viewsRouter);

// ── Rutas API ────────────────────────────────────────────────────────────────
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// ── Conexión a MongoDB y arranque ────────────────────────────────────────────
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar MongoDB:', err.message);
    process.exit(1);
  });
  


  