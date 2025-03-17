const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetailsModel");
const User = require("../models/authModel");
const userDetailsController = require("../controllers/userDetailsController");
const middleware = require("../middleware/requirelogin");

// Route to get user details by ID
router.get("/", middleware, userDetailsController.getUserDetails);

router.post("/", middleware, userDetailsController.postUserDetails);

// Route to update user details by ID
router.put("/", middleware, userDetailsController.updateUserDetails);

module.exports = router;
