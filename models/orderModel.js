const mongoose = require("mongoose");

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    // Reference to the User placing the order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true, // Adds an index for faster lookups
    },

    // Array of product references in the order
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "ProductLists", // Reference to Product model
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
          min: [0, "Price must be a positive number"],
        },
      },
    ],

    // Total price of the order
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },

    // Order status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], // Restrict to valid values
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Order model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
