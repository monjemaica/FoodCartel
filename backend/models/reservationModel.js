const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  table_number: { type: Number, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String, required: true },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

const getReservations = () => Reservation.find();

const getReservationById = (id) => Reservation.findById(id);

const getReservByUserId = (id) => Reservation.find(id);

const createReserv = (values) => {
  return new Reservation(values).save().then((reserv) => reserv.toObject);
};

module.exports = {
  getReservations,
  getReservationById,
  getReservByUserId,
  createReserv,
};
