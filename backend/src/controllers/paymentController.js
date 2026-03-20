const paymentService = require('../services/paymentService');
const logger = require('../utils/logger');

const checkout = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const result = await paymentService.processPayment(orderId, amount);
    res.status(200).json({
      success: true,
      message: result.message,
      data: null
    });
  } catch (err) {
    logger.error(`Payment error: ${err.message}`);
    res.status(400).json({
      success: false,
      message: err.message,
      data: null
    });
  }
};

module.exports = { checkout };
