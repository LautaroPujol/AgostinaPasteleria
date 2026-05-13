import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { cliente, productos, total } = req.body;

    const order = new Order({ cliente, productos, total });
    await order.save();

    await Promise.all(
      productos.map(async (item) => {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }
        );
      })
    );

    res.status(201).json({ status: 'success', payload: { id: order._id } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};