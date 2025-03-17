
const Order = require("../models/orderModel"); // Import Order model
const Product = require("../models/productlistModel"); // Import Product model for validation

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Validate if all product IDs exist in the Product database and populate price
        for (const item of items) {
            const product = await Product.findById(item.productId).populate('price');
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
            }
            item.price = product.price; // Update item price from the database
        }

        console.log(items)
        // Calculate the total price
        const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

        // Create a new order
        const order = new Order({
            userId,
            items,
            totalPrice,
        });

        // Save the order to the database
        await order.save();

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).populate("items.productId", "name price");

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Get details of a specific order
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate("items.productId", "name price");

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
};