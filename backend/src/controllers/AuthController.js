import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@agostina.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD || 'admin1234',
  10
);

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ status: 'error', message: 'Email o contraseña incorrectos' });
    }

    const validPassword = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
    if (!validPassword) {
      return res.status(401).json({ status: 'error', message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ status: 'success', token });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const logout = (req, res) => {
  res.json({ status: 'success', message: 'Sesión cerrada' });
};