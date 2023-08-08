const express = require("express");
const path = require("path");
const config = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts')

const app = express();

// Middleweares
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/uploads', express.static('uploads'));

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongodb.url);

    if (connection) {
      app.listen(config.server.port, () => {
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        console.log(`Server started on port http://localhost:${config.server.port}/foodCartel`);
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

connectDB();

require('./routes/routes.js')(app);

//   app.use('/', homeRoute);
//   app.use('/signup', signupRoute);
//   app.use('/login', loginRoute);
//   app.use('/reservation', reservationRoute);

// db.on('error', () => console.log("Error in Connecting to Database"));
