const express = require('express');
const router = express.Router();
const UserDetails = require('../models/userDetailsModel');
const User = require('../models/authModel');
const userDetailsController = require('../controllers/userDetailsController')

// Route to get user details by ID
router.get('/:id',userDetailsController.getUserDetails )

router.post('/', userDetailsController.postUserDetails);

  // Route to update user details by ID
router.put('/:id',userDetailsController.updateUserDetails );
  
module.exports = router;