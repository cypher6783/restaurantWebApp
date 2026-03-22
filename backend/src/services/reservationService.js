const prisma = require('../config/prisma');

const createReservation = async (reservationData) => {
  return await prisma.reservation.create({
    data: {
      ...reservationData,
      date: new Date(reservationData.date),
      guests: parseInt(reservationData.guests)
    }
  });
};

const getReservations = async (userId) => {
  return await prisma.reservation.findMany({
    where: userId ? { userId } : {},
    orderBy: { date: 'desc' }
  });
};

module.exports = {
  createReservation,
  getReservations
};
