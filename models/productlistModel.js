const mongoose = require('mongoose');
// Define the User Schema
const productlistSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});
// Create a productList Model
const ProductList = mongoose.model('ProductLists', productlistSchema);
module.exports = ProductList; // Export the ProductList model