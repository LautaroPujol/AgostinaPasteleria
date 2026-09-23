import React from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../FireBase/Config'; 
import { misProductos } from '../../Stock'; // <--- IMPORTA TU ARRAY AQUÍ

const CargarProductos = () => {

  const subirTodo = () => {
    // 1. Referencia a la colección donde queremos guardar
    const productosRef = collection(db, "productos");

    // 2. Recorremos tu array y subimos uno por uno
    misProductos.forEach((prod) => {
      // Usamos addDoc para que Firebase le invente un ID único a cada uno
      addDoc(productosRef, prod)
        .then((doc) => {
            console.log(`Producto subido: ${prod.Nombre} - ID: ${doc.id}`);
        })
        .catch((error) => {
            console.error("Error al subir:", error);
        });
    });
    
    alert("¡Revisa la consola! Los productos se están subiendo.");
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Herramienta de Carga Masiva</h2>
      <button onClick={subirTodo} className="btn btn-danger">
        Subir todos los productos a Firestore 🚀
      </button>
    </div>
  );
};

export default CargarProductos;