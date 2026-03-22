<<<<<<< HEAD
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
=======
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const logger = require('../utils/logger');

const register = async (userData) => {
  const { name, email, phone, password } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword
    }
  });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

module.exports = {
  register,
  login,
  getUserById
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
};
