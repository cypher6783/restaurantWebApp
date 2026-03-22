const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect } = require('../middlewares/authMiddleware');
const { mutationLimiter, apiLimiter } = require('../middlewares/rateLimiter');

router.post('/', mutationLimiter, (req, res, next) => {
  // Optional auth for guest reservations
  next();
}, reservationController.create);

router.get('/', protect, apiLimiter, reservationController.list);

module.exports = router;
