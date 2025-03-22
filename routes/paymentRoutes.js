const express = require('express');
const router = express.Router();
const {createOrder, verifyPayment} = require('../controllers/paymentController')
// Define routes
router.post('/order', createOrder); 
router.post('/verify', verifyPayment); 


// Export the router
module.exports = router;