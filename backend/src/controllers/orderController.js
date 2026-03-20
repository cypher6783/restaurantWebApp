const orderService = require('../services/orderService');
const logger = require('../utils/logger');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await orderService.createOrder(req.user.id, items, totalAmount);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (err) {
    logger.error(`Order creation error: ${err.message}`);
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.status(200).json({
      success: true,
      message: 'Orders retrieved',
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      data: null
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        data: null
      });
    }
    // Check if user owns order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order retrieved',
      data: order
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      data: null
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateOrderStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'All orders retrieved',
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      data: null
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  updateStatus,
  getAllOrders
};
