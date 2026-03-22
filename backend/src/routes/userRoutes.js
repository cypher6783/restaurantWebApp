const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { mutationLimiter, apiLimiter } = require('../middlewares/rateLimiter');

router.get('/profile', protect, apiLimiter, userController.getProfile);
router.put('/profile', protect, mutationLimiter, userController.updateProfile);

router.get('/favorites', protect, apiLimiter, userController.getFavorites);
router.post('/favorites/toggle', protect, mutationLimiter, userController.toggleFavorite);

module.exports = router;
