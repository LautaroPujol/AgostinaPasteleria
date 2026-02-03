const misProductos= [ { id: 1, Nombre: "Torta Matilda", Precio: 5000, Img: "/AgostinaPasteleria/imagenes/tortamatilda.png",  stock: 15, descripcion: "Chocolate puro, suave y esponjosa, perfecta para compartir." },
    { id: 2, Nombre: "Torta Merengue", Precio: 15000, Img: "/AgostinaPasteleria/imagenes/tortamerengue.png",  stock: 15, descripcion: "Capas suaves con merengue dorado que se derrite en la boca." },
    { id: 3, Nombre: "Total Almendra", Precio: 8000, Img: "/AgostinaPasteleria/imagenes/tortaalmendra.png",  stock: 15, descripcion: "Tierna, aromática y con nueces crujientes irresistibles." },
    { id: 4, Nombre: "Torta Rogel", Precio: 12000, Img: "/AgostinaPasteleria/imagenes/tortarogel.png", stock: 15, descripcion: "Capas crocantes con dulce de leche y merengue dorado." },
    { id: 5, Nombre: "Lemon pie", Precio: 7000, Img: "/AgostinaPasteleria/imagenes/lemonpie.png",  stock: 15, descripcion: "Base crujiente, relleno ácido y cobertura esponjosa." },
    { id: 6, Nombre: "Torta Frutilla", Precio: 6000, Img: "/AgostinaPasteleria/imagenes/tortafrutilla.png",  stock: 15, descripcion: "Crema delicada y frutillas frescas, alegría en cada bocado." },
    { id: 7, Nombre: "Torta Chaja", Precio: 3000, Img: "/AgostinaPasteleria/imagenes/tortachaja.png",  stock: 15, descripcion: "Bizcochuelo suave, crema batida y duraznos frescos." },
    { id: 8, Nombre: "Torta Imperial Ruso", Precio: 4000, Img: "/AgostinaPasteleria/imagenes/imperialruso.png",  stock: 15, descripcion: "Base de pionono y crema, placer que conquista paladares." },
    { id: 9, Nombre: "Torta Alfajor", Precio: 50000, Img: "/AgostinaPasteleria/imagenes/tortaalfajor.png", stock: 15, descripcion: "Galletas suaves, dulce de leche y cobertura de chocolate." },
   
]

export const pedirProductos = () => {
    return new Promise((resolve, reject) => {
      
        setTimeout(() => {
            resolve(misProductos); 
        }, 1000);
    });
};