const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    return res.redirect('index.html');
});

module.exports = router;
