const express = require('express');
const menuController = require('../controllers/menuController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { menuSchema } = require('../utils/validators');
const { apiLimiter, mutationLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.get('/', apiLimiter, menuController.getMenuItems);
router.get('/:id', apiLimiter, menuController.getMenuItem);

// Admin only routes
router.post('/', protect, authorize('ADMIN'), mutationLimiter, validate(menuSchema), menuController.createMenuItem);
router.put('/:id', protect, authorize('ADMIN'), mutationLimiter, validate(menuSchema), menuController.updateMenuItem);
router.delete('/:id', protect, authorize('ADMIN'), menuController.deleteMenuItem);

module.exports = router;
