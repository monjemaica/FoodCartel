const express = require("express");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/", async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log('Successfully logged in.');
        return res.redirect('userProfile.html');
      } else {
        console.log('Invalid login details');
        return res.status(401).send('Invalid login details');
      }
    } else {
      console.log('User not found');
      return res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
