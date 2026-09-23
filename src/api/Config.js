// Antes este archivo conectaba con Firebase
// Ahora simplemente define la URL de tu backend
// y helpers para manejar el token JWT del admin

// Si tenés un .env en el frontend con VITE_API_URL=http://localhost:8080
// lo toma de ahí. Si no, usa localhost:8080 por defecto
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Guarda el token JWT en localStorage cuando el admin hace login
export const setToken = (token) => localStorage.setItem('token', token);

// Obtiene el token guardado para mandarlo en los headers de las requests
export const getToken = () => localStorage.getItem('token');

// Borra el token cuando el admin hace logout
export const removeToken = () => localStorage.removeItem('token');

// Devuelve true si hay un token guardado (el admin está logueado)
export const isAuthenticated = () => !!localStorage.getItem('token');