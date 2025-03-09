// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const productlistController = require("../controllers/productlistController");

// Define routes
router.get("/", productlistController.getAllProducts); // GET all product
router.post("/", productlistController.addProduct); // POST a new product
router.post("/uploadproductlist", productlistController.addFromJSON); // POST new product from JSON

// Export the router
module.exports = router;
