const express = require("express");
const { signup, signin } = require("../controllers/auth");

const router = express.Router();
// create a user
router.post("/signup", signup);

// sign in
router.post("/signin", signin);

module.exports = router;
