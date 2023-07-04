const express = require("express");
const moment = require("moment");
const router = express.Router();
const Reservation = require("../models/reservationSchema");

router.post("/", async (req, res) => {
    const { name, email, phone, date, time, guests } = req.body;

    // Parse the date and time string using Moment.js
    const datee = moment(`${date} ${time}`, "YYYY-MM-DD hh:mm A");

    // Format the date as desired
    const formattedDate = datee.format("MMMM DD, YYYY");


    // Combine date and time strings into a single string in the expected format
    const dateTimeStr = `${date} ${time}`;

    // Parse the date and time string using Moment.js
    const dateTime = moment(dateTimeStr, "YYYY-MM-DD hh:mm A");

    // Format the time as desired
    const formattedTime = dateTime.format("h:mm A");



    // Create a new reservation document
    const reservation = new Reservation({
        name,
        email,
        phone,
        date: formattedDate,
        time: formattedTime, // Save the formatted time as a string
        guests,
    });

    try {
        // Save the new reservation to the database
        const savedReservation = await reservation.save();
        console.log(savedReservation);
        res.status(200).send("Reservation created successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating reservation");
    }
});

module.exports = router;
