
// models/cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductLists', required: true }, // Reference to Product model
    quantity: { type: Number, required: true, min: 1 }
  }],
  price:{type: Number, required: true}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;