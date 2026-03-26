const prisma = require('../config/prisma');
const eventBus = require('../events/eventBus');

const createOrder = async (userId, items, totalAmount) => {
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      items: {
        create: items.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: {
      items: true
    }
  });

  eventBus.emit('order.created', order);
  return order;
};

const getOrdersByUser = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: 'desc' }
  });
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { menuItem: true } }, user: { select: { name: true, email: true } } }
  });
};

const updateOrderStatus = async (orderId, status) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });

  eventBus.emit('order.updated', { orderId, status });
  return order;
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getAllOrders
};
