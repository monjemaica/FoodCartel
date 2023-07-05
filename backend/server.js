const express = require("express");
const path = require("path");
const config = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();


const app = express();

// Middleweares
app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../views")));
app.set('view engine', 'ejs');
app.get('/', (req,res) => {
  res.render('index');
})

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongodb.url);

    if (connection) {
      app.listen(config.server.port, () => {
        console.log(`MongoDB Connected: ${connection.connection.host}`);
        console.log(`Server started on port ${config.server.port}`);
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
