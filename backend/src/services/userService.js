const prisma = require('../config/prisma');

const getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      addresses: true,
      createdAt: true
    }
  });
};

const updateUserProfile = async (userId, data) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      addresses: true,
      createdAt: true
    }
  });
};

const getFavorites = async (userId) => {
  return await prisma.favorite.findMany({
    where: { userId },
    include: { menuItem: true }
  });
};

const toggleFavorite = async (userId, menuItemId) => {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_menuItemId: { userId, menuItemId }
    }
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { status: 'removed' };
  } else {
    await prisma.favorite.create({
      data: { userId, menuItemId }
    });
    return { status: 'added' };
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getFavorites,
  toggleFavorite
};
