import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const productos = [
  {
    title: 'Imperial Ruso',
    description: 'Clásico de la pastelería argentina, capas de merengue y crema.',
    code: 'imperial-ruso-001',
    price: 8500,
    stock: 10,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/imperialruso.png']
  },
  {
    title: 'Lemon Pie',
    description: 'Base crocante, relleno de crema de limón y merengue tostado.',
    code: 'lemon-pie-002',
    price: 7800,
    stock: 8,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/lemonpie.png']
  },
  {
    title: 'Torta Alfajor',
    description: 'Capas de masa con dulce de leche y baño de chocolate.',
    code: 'torta-alfajor-003',
    price: 9200,
    stock: 6,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortaalfajor.png']
  },
  {
    title: 'Torta Almendra',
    description: 'Bizcochuelo húmedo con crema de almendras y cobertura artesanal.',
    code: 'torta-almendra-004',
    price: 9800,
    stock: 5,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortaalmendra.png']
  },
  {
    title: 'Torta Chajá',
    description: 'El postre uruguayo clásico: bizcochuelo, durazno, crema y merengue.',
    code: 'torta-chaja-005',
    price: 10500,
    stock: 7,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortachaja.png']
  },
  {
    title: 'Torta Frutilla',
    description: 'Bizcochuelo esponjoso con crema chantilly y frutillas frescas.',
    code: 'torta-frutilla-006',
    price: 8900,
    stock: 9,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortafrutilla.png']
  },
  {
    title: 'Torta Matilda',
    description: 'Torta de chocolate intenso con relleno de dulce de leche y nueces.',
    code: 'torta-matilda-007',
    price: 11000,
    stock: 4,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortamatilda.png']
  },
  {
    title: 'Torta Merengue',
    description: 'Base de merengue crocante con crema y frutas de estación.',
    code: 'torta-merengue-008',
    price: 9500,
    stock: 6,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortamerengue.png']
  },
  {
    title: 'Torta Rogel',
    description: 'Hojaldre artesanal con capas de dulce de leche y merengue italiano.',
    code: 'torta-rogel-009',
    price: 10200,
    stock: 5,
    status: true,
    category: 'tortas',
    thumbnails: ['http://localhost:8080/images/tortarogel.png']
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    await Product.deleteMany({});
    console.log('🗑️  Productos anteriores eliminados');
    const creados = await Product.insertMany(productos);
    console.log(`🍰 ${creados.length} productos cargados:`);
    creados.forEach(p => console.log(`   - ${p.title} ($${p.price})`));
    mongoose.disconnect();
    console.log('👋 Listo, podés arrancar con npm run dev');
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });