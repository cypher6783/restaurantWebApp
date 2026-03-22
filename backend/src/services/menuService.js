const prisma = require('../config/prisma');

// Regex to detect a standard UUID (e.g. "a1b2c3d4-e5f6-...")
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getAllMenuItems = async (category) => {
  const where = category && category !== 'All' ? { category } : {};
  return await prisma.menuItem.findMany({ where, orderBy: { name: 'asc' } });
};

const getMenuItemById = async (id) => {
  // Try direct UUID lookup first
  if (UUID_REGEX.test(id)) {
    return await prisma.menuItem.findUnique({ where: { id } });
  }

  // Slug fallback: convert "smokey-jollof" → search name containing "smokey jollof"
  const nameGuess = id.replace(/-/g, ' ');
  return await prisma.menuItem.findFirst({
    where: { name: { contains: nameGuess, mode: 'insensitive' } },
  });
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
