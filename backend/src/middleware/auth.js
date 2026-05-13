import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Este middleware protege las rutas que solo puede usar el admin
// Se ejecuta ANTES del controller en las rutas POST, PUT y DELETE de productos
export const authMiddleware = (req, res, next) => {

  // El frontend manda el token en el header así:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  const authHeader = req.headers.authorization;

  // Si no hay header o no empieza con "Bearer ", rechazamos el request
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Token no proporcionado. Tenés que iniciar sesión.'
    });
  }

  // Extraemos solo el token (sacamos el "Bearer " del principio)
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos que el token sea válido y no haya expirado
    // jwt.verify() tira un error si el token es inválido o expiró
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos los datos del admin en req.user para usarlos en el controller si hace falta
    req.user = decoded; // tiene: { email, role: 'admin', iat, exp }

    // Todo bien → pasamos al controller
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado. Iniciá sesión de nuevo.'
    });
  }
};