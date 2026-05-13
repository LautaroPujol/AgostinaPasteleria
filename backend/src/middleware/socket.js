// Este middleware inyecta el objeto `io` de Socket.io dentro de `req`
// Así los controllers pueden emitir eventos en tiempo real sin necesidad
// de importar io directamente (lo reciben por req.io)

// Recibe el `io` que se crea en app.js y devuelve un middleware de Express
export const socketMiddleware = (io) => (req, res, next) => {
  req.io = io; // adjuntamos io al objeto request
  next();      // seguimos con el siguiente middleware o controller
};

// Ejemplo de uso en un controller:
// req.io.emit('product-created', nuevoProducto)
// → todos los browsers conectados reciben ese evento en tiempo real