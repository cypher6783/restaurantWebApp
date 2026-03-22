const express = require('express');
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/checkout', protect, paymentController.checkout);

module.exports = router;
