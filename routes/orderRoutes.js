const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // Import the Order Controller

// Route to create a new order
router.post("/", orderController.createOrder);

// Route to get all orders for a specific user
router.get("/user/:userId", orderController.getUserOrders);

// Route to get details of a specific order
router.get("/:orderId", orderController.getOrderById);

// Route to update the status of an order
router.patch("/:orderId", orderController.updateOrderStatus);

module.exports = router;
