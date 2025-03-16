// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const middleware = require('../middleware/requirelogin')
// Add an item to the cart
router.post('/',middleware, cartController.addItem);

// Update an item in the cart
router.put('/',middleware, cartController.updateItem);

// Get user's cart
router.get('/:userId',middleware, cartController.getCart);

// Delete item from cart
router.delete('/',middleware, cartController.deleteItem);

module.exports = router;