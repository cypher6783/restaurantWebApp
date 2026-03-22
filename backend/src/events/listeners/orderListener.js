const eventBus = require('../eventBus');
const { getIO } = require('../../sockets/socketManager');
const logger = require('../../utils/logger');

eventBus.on('order.updated', (payload) => {
  try {
    const io = getIO();
    io.to(payload.orderId).emit('orderStatusUpdate', payload);
    logger.info(`Emitted orderStatusUpdate for order ${payload.orderId}`);
  } catch (err) {
    logger.error(`Failed to emit orderStatusUpdate: ${err.message}`);
  }
});

eventBus.on('order.created', (payload) => {
  // Logic for notifications, analytics, etc.
  logger.info(`Order created event received: ${payload.id}`);
});

eventBus.on('payment.completed', async (payload) => {
  const orderService = require('../../services/orderService');
  try {
    await orderService.updateOrderStatus(payload.orderId, 'PREPARING');
    logger.info(`Updated order ${payload.orderId} status to PREPARING after payment`);
  } catch (err) {
    logger.error(`Failed to update order status after payment: ${err.message}`);
  }
});

module.exports = {};
