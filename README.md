Tienda online de repostería artesanal desarrollada con React + Vite y Firebase. Permite a los clientes explorar el catálogo de productos y armar su pedido desde un carrito de compras.
🌐 Demo en vivo: agostinapasteleria-72f9d.web.app


✨ Funcionalidades

🛍️ Catálogo de productos — visualización de todos los productos de la pastelería con imagen, nombre y precio
🛒 Carrito de compras — agregar, quitar y gestionar productos antes de confirmar el pedido
☁️ Productos desde Firebase — los productos se obtienen dinámicamente desde Firestore
📱 Diseño responsive — adaptado para móviles, tablets y escritorio


🛠️ Tecnologías
TecnologíaRolReactUI y componentesViteBundler y entorno de desarrolloContext APIManejo global del estado del carritoFirebase FirestoreBase de datos de productosFirebase HostingDeploy y hosting del sitioCSSEstilos y diseño visual

🚀 Instalación local
Prerrequisitos

Node.js >= 18
npm >= 9

Pasos
bash# 1. Clonar el repositorio
git clone https://github.com/LautaroPujol/AgostinaPasteleria.git
cd AgostinaPasteleria

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear un archivo .env en la raíz con las credenciales de Firebase
cp .env.example .env
# Completar con tus datos de Firebase

# 4. Iniciar el servidor de desarrollo
npm run dev
La aplicación estará disponible en http://localhost:5173.

⚙️ Variables de entorno
Creá un archivo .env en la raíz del proyecto con tus credenciales de Firebase:
envVITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

⚠️ Nunca subas el archivo .env al repositorio. Ya está incluido en .gitignore.


📦 Scripts disponibles
bashnpm run dev       # Inicia el servidor de desarrollo (Vite)
npm run build     # Genera la build de producción en /dist
npm run preview   # Previsualiza la build localmente
npm run lint      # Ejecuta ESLint sobre el proyecto

🔥 Deploy en Firebase Hosting
bash# 1. Instalar Firebase CLI (si no lo tenés)
npm install -g firebase-tools

# 2. Login con tu cuenta de Google
firebase login

# 3. Generar la build de producción
npm run build

# 4. Desplegar
firebase deploy
El sitio quedará publicado en la URL configurada en .firebaserc.

📁 Estructura del proyecto
AgostinaPasteleria/
├── public/                  # Archivos estáticos públicos
├── src/
│   ├── components/          # Componentes reutilizables (Navbar, Card, Cart, etc.)
│   ├── context/             # Context API — estado global del carrito
│   ├── pages/               # Vistas principales (Home, Catálogo, etc.)
│   ├── firebase/            # Configuración e inicialización de Firebase
│   ├── App.jsx              # Componente raíz y rutas
│   └── main.jsx             # Punto de entrada
├── .firebaserc              # Configuración del proyecto Firebase
├── firebase.json            # Reglas de hosting de Firebase
├── vite.config.js           # Configuración de Vite
├── eslint.config.js         # Reglas de ESLint
├── index.html               # HTML base
└── package.json             # Dependencias y scripts

👥 Contribuidores

Lautaro Pujol — @LautaroPujol
