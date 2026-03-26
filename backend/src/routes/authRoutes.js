const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../utils/validators');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
