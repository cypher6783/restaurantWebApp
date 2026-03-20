const express = require('express');
const menuController = require('../controllers/menuController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { menuSchema } = require('../utils/validators');

const router = express.Router();

router.get('/', menuController.getMenuItems);
router.get('/:id', menuController.getMenuItem);

// Admin only routes
router.post('/', protect, authorize('ADMIN'), validate(menuSchema), menuController.createMenuItem);
router.put('/:id', protect, authorize('ADMIN'), validate(menuSchema), menuController.updateMenuItem);
router.delete('/:id', protect, authorize('ADMIN'), menuController.deleteMenuItem);

module.exports = router;
