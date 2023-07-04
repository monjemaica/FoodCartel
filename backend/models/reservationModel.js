const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true }, // Change the data type to String
    guests: { type: Number, required: true }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
