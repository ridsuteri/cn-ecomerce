const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');


// Define routes
router.post('/login', userController.loginUsers); // login user 
router.post('/signup', userController.signupUser); // signup user


// Export the router
module.exports = router;