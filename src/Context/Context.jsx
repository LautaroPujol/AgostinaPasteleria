import React, { createContext, useState } from 'react';

// 1. Creamos el contexto (la nube)
export const CartContext = createContext();

// 2. Creamos el componente proveedor (el que envuelve a tu App)
export const CartProvider = ({ children }) => {
    
    // Acá guardamos los productos. Empieza como un array vacío []
    const [carrito, setCarrito] = useState([]);

    // FUNCIÓN: Agregar al carrito
    const agregarAlCarrito = (item, cantidad) => {
        const itemAgregado = { ...item, cantidad };
        
        // Creamos un carrito nuevo con lo que ya había + el nuevo item
        const nuevoCarrito = [...carrito]; 
        
        // (Acá hay un truquito: Preguntamos si el producto ya estaba)
        const estaEnElCarrito = nuevoCarrito.find((producto) => producto.id === itemAgregado.id);

        if (estaEnElCarrito) {
            // Si ya estaba, solo le sumamos la cantidad
            estaEnElCarrito.cantidad += cantidad;
        } else {
            // Si no estaba, lo agregamos normal
            nuevoCarrito.push(itemAgregado);
        }
        
        setCarrito(nuevoCarrito);
    }

    // FUNCIÓN: Calcular cantidad total (para el numerito del ícono)
    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }

    // FUNCIÓN: Calcular precio total
    const precioTotal = () => {
        return carrito.reduce((acc, prod) => acc + (prod.Precio * prod.cantidad), 0);
    }

    // FUNCIÓN: Vaciar carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    }

    // FUNCIÓN: Eliminar un producto
    const eliminarItem = (id) => {
        setCarrito( carrito.filter((prod) => prod.id !== id) );
    }

    // 3. Retornamos el componente envolviendo a los "children" (toda tu app)
    return (
        <CartContext.Provider value={ {
            carrito, 
            agregarAlCarrito, 
            cantidadEnCarrito, 
            precioTotal, 
            vaciarCarrito,
            eliminarItem
        } }>
            {children}
        </CartContext.Provider>
    )
}