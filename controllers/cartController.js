// controllers/cartController.js
const Cart = require("../models/cartModel");

// Add item to the cart
exports.addItem = async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  try {
    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if the user doesn't have one
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex >= 0) {
      // Update the quantity if the item already exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add the new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update item in the cart
exports.updateItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // redis.get('userId-cart').then()
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    ); // Populate product details

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete item from the cart
exports.deleteItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
