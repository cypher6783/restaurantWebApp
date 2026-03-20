const userService = require('../services/userService');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { user, token } = await userService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user, token }
    });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(401).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: user
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      data: null
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
