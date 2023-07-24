const Reserv = require('../models/reservationModel');
const moment = require('moment');


exports.create = async(req, res) => {
    try {
        const {user_id, table_number, guests, date, time, note} = req.body;

        if(!req.body){
            return res.status(400).send("No data found");
        }

        const reserv = await Reserv.createReserv({
            user_id,
            table_number,
            guests,
            date,
            time, 
            note
        })

        res.status(200).json({msg:"Successfully Order Created", data:reserv, redirect: "test"})
    } catch (error) {
        console.log(error)
        return;
    }
}

exports.getReservations = async(req, res) => {
    try {
        const reservations = await Reserv.getReservations();

        return res.send(200).json(reservations);
    } catch (error) {
        console.log(error)
        return;
    }
}

exports.getReservById = async(req, res) => {
    try {
        if(!req.params){
            res.send(400).send("No params found");
        }

        const reserv = await Reserv.getReservation(req.params);

        return res.status(200).json(reserv);
    } catch (error) {
        console.log(error)
        return;
    }
}


exports.getUserReservations = async(req,res) => {
    try {
        if (!req.params) {
            res.send(400).send("No params found");
        }

        const reserv = await Reserv.getReservByUserId(req.params);

        res.render("reservations", {req, reserv, moment});
    } catch (error) {
        console.log(error)
        return
    }
}


