const userService = require('../services/userService');

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, addresses } = req.body;
    const user = await userService.updateUserProfile(req.user.id, { name, phone, addresses });
    res.json({ success: true, data: user, message: 'Profile updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await userService.getFavorites(req.user.id);
    res.json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const { menuItemId } = req.body;
    if (!menuItemId) return res.status(400).json({ success: false, message: 'menuItemId is required' });
    
    const result = await userService.toggleFavorite(req.user.id, menuItemId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
  toggleFavorite
};
