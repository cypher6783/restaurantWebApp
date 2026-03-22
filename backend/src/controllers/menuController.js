const menuService = require('../services/menuService');
const logger = require('../utils/logger');

const getMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    const items = await menuService.getAllMenuItems(category);
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    res.status(200).json({
      success: true,
      message: 'Menu items retrieved',
      data: items
    });
  } catch (err) {
    logger.error(`Error fetching menu items: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch menu items',
      data: null
    });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const item = await menuService.getMenuItemById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
        data: null
      });
    }
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    res.status(200).json({
      success: true,
      message: 'Menu item retrieved',
      data: item
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch menu item',
      data: null
    });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const item = await menuService.createMenuItem(req.body);
    res.status(201).json({
      success: true,
      message: 'Menu item created',
      data: item
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const item = await menuService.updateMenuItem(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Menu item updated',
      data: item
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    await menuService.deleteMenuItem(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Menu item deleted',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
