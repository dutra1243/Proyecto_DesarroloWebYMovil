const express = require("express");
const {runSeed} = require("../controllers/seedController");
const router = express.Router();


// Seed data
router.post('/users/:qty', runSeed);


module.exports = router;
