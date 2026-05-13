import {
  getAllProductsDB,
  getProductByIdDB
} from '../dao/db/ProductManagerDB.js';
import { getCartByIdDB } from '../dao/db/CartManagerDB.js';

// GET /products
export const renderProducts = async (req, res) => {
  try {
    const { limit = 8, page = 1, query, sort } = req.query;

    const result = await getAllProductsDB({ limit, page, query, sort });

    // Adaptamos los datos para Handlebars
    const products = result.docs.map(p => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      thumbnail: p.thumbnails?.[0] || '',
      hasStock: p.stock > 0,
      status: p.status
    }));

    // Construimos los links de paginación
    const baseUrl = '/products';
    const buildLink = (p) => {
      const params = new URLSearchParams({
        limit,
        page: p,
        ...(query && { query }),
        ...(sort && { sort })
      });
      return `${baseUrl}?${params.toString()}`;
    };

    res.render('products', {
      products,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.page - 1) : null,
      nextLink: result.hasNextPage ? buildLink(result.page + 1) : null
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos: ' + error.message);
  }
};

// GET /products/:pid
export const renderProductDetail = async (req, res) => {
  try {
    const product = await getProductByIdDB(req.params.pid);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    // Adaptamos para Handlebars
    const productData = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      thumbnail: product.thumbnails?.[0] || '',
      hasStock: product.stock > 0,
      status: product.status
    };

    // Mandamos un cartId de ejemplo para el formulario de agregar al carrito
    // En un proyecto real esto vendría de la sesión del usuario
    res.render('productDetail', {
      product: productData,
      cartId: 'demo'
    });
  } catch (error) {
    res.status(500).send('Error al cargar el producto: ' + error.message);
  }
};

// GET /carts/:cid
export const renderCart = async (req, res) => {
  try {
    const cart = await getCartByIdDB(req.params.cid);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    // Adaptamos los productos del carrito para Handlebars
    const products = cart.products.map(item => ({
      title: item.product.title,
      price: item.product.price,
      thumbnail: item.product.thumbnails?.[0] || '',
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));

    // Calculamos el total
    const total = products.reduce((acc, item) => acc + item.subtotal, 0);

    res.render('cart', {
      products,
      total,
      hasProducts: products.length > 0
    });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito: ' + error.message);
  }
};