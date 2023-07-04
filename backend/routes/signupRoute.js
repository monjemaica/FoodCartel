const express = require("express");
const User = require('../models/userSchema');
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    console.log("Document inserted successfully.");
    console.log(name, email, phone, password, hashedPassword);

    res.redirect('userProfile.html');
  } catch (error) {
    console.log(error);
    res.redirect('index.html');
  }
});

module.exports = router;
