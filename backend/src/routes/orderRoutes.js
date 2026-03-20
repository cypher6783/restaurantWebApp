const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { orderSchema } = require('../utils/validators');

const router = express.Router();

router.post('/', protect, validate(orderSchema), orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrder);

// Admin only
router.get('/', protect, authorize('ADMIN'), orderController.getAllOrders);
router.patch('/:id/status', protect, authorize('ADMIN'), orderController.updateStatus);

module.exports = router;
