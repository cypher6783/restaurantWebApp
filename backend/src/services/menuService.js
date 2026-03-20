const prisma = require('../config/prisma');

const getAllMenuItems = async (category) => {
  const where = category && category !== 'All' ? { category } : {};
  return await prisma.menuItem.findMany({ where });
};

const getMenuItemById = async (id) => {
  return await prisma.menuItem.findUnique({ where: { id } });
};

const createMenuItem = async (data) => {
  return await prisma.menuItem.create({ data });
};

const updateMenuItem = async (id, data) => {
  return await prisma.menuItem.update({
    where: { id },
    data
  });
};

const deleteMenuItem = async (id) => {
  return await prisma.menuItem.delete({ where: { id } });
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
