const { createReservation, getReservations } = require('../services/reservationService');

const create = async (req, res) => {
  try {
    const reservation = await createReservation({
      ...req.body,
      userId: req.user ? req.user.id : null
    });
    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const list = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const reservations = await getReservations(userId);
    res.json({ success: true, data: reservations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  create,
  list
};
