
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyAi9QlV9lLKTTVbb3dcyv7l8qoWbRR1fQk",
  authDomain: "agostinapasteleria-72f9d.firebaseapp.com",
  projectId: "agostinapasteleria-72f9d",
  storageBucket: "agostinapasteleria-72f9d.firebasestorage.app",
  messagingSenderId: "14861432346",
  appId: "1:14861432346:web:e0c10a52c772d6c567c3a3",
  measurementId: "G-XYF3R6KNGF"
};


const app = initializeApp(firebaseConfig);

// 4. ¡ESTA ES LA CLAVE! Inicializamos y exportamos la DB
// Sin esto, no podremos guardar los pedidos.
export const db = getFirestore(app);
export const auth = getAuth(app);