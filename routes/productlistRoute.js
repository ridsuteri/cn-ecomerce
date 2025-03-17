// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const productlistController = require("../controllers/productlistcontroller");
const middleware = require("../middleware/requirelogin");
// Define routes
router.get("/", productlistController.getAllProducts); // GET all product
router.post("/", middleware, productlistController.addProduct); // POST a new product
router.post("/uploadproductlist", middleware, productlistController.addFromJSON); // POST new product from JSON

// Export the router
module.exports = router;
