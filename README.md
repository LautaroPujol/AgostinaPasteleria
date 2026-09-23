me generas un readme nuevo para el proyecto

20:28
Claude respondió: backend/
markdown
# 🍰 Agostina Pastelería — Backend

API REST para la tienda online de Agostina Pastelería. Migración completa desde Firebase a un backend propio con Node.js, Express y MongoDB.

## 🛠️ Stack tecnológico

- **Node.js + Express** — servidor REST
- **MongoDB + Mongoose** — base de datos principal
- **FileSystem** — persistencia secundaria
- **Socket.io** — actualización en tiempo real
- **JWT + bcrypt** — autenticación del admin
- **Handlebars** — motor de vistas del servidor

## 📁 Estructura del proyecto
backend/
├── src/
│   ├── controllers/     # lógica de negocio
│   ├── dao/
│   │   ├── db/          # acceso a MongoDB
│   │   └── fs/          # acceso a FileSystem
│   ├── middleware/      # auth JWT y socket.io
│   ├── models/          # schemas de Mongoose
│   ├── routes/          # routers de Express
│   ├── views/           # vistas con Handlebars
│   ├── app.js           # punto de entrada
│   └── seed.js          # carga de datos iniciales
├── public/
│   ├── images/          # imágenes de productos
│   └── css/             # estilos de las vistas
├── data/
│   └── products.json    # respaldo FileSystem
├── .env.example
└── package.json


## 🚀 Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/LautaroPujol/AgostinaPasteleria.git
cd AgostinaPasteleria/backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copiá `.env.example` y renombralo a `.env`:
PORT=8080 MONGODB_URI=mongodb://localhost:27017/ecommerce JWT_SECRET=agostina_pasteleria_secret_key_2024 ADMIN_EMAIL=admin@agostina.com ADMIN_PASSWORD=admin1234


### 4. Cargar productos de prueba
```bash
npm run seed
```

### 5. Levantar el servidor
```bash
npm run dev
```

El servidor corre en `http://localhost:8080`

## 📡 Endpoints

### Productos
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /api/products | Listar productos (limit, page, query, sort) | No |
| GET | /api/products/:pid | Obtener producto por ID | No |
| POST | /api/products | Crear producto | ✅ |
| PUT | /api/products/:pid | Actualizar producto | ✅ |
| DELETE | /api/products/:pid | Eliminar producto | ✅ |

### Carritos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/carts | Crear carrito |
| GET | /api/carts/:cid | Ver carrito (con populate) |
| POST | /api/carts/:cid/products/:pid | Agregar producto |
| PUT | /api/carts/:cid/products/:pid | Actualizar cantidad |
| DELETE | /api/carts/:cid/products/:pid | Eliminar producto |
| DELETE | /api/carts/:cid | Vaciar carrito |

### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/login | Login admin → devuelve JWT |
| POST | /api/auth/logout | Logout |

### Pedidos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/orders | Crear pedido y descontar stock |

## 🖥️ Vistas del servidor

| Ruta | Descripción |
|------|-------------|
| /products | Catálogo con paginación y filtros |
| /products/:pid | Detalle de producto |
| /carts/:cid | Visualización del carrito |

## 🔌 WebSockets

El servidor emite estos eventos en tiempo real:
- `product-created` → nuevo producto creado
- `product-updated` → producto editado
- `product-deleted` → producto eliminado

## 👤 Credenciales del admin
Email: admin@agostina.com Contraseña: admin1234