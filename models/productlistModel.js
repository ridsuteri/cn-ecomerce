// controllers/productlistController.js
const productList = require("../models/productlistModel");
// Get all product list
exports.getAllProducts = async (req, res) => {
  try {
    const product = await productList.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, description, Image } = req.body;
  const productList = new productList({ name, price, description, Image });
  try {
    await productList.save();
    res
      .status(201)
      .json({ message: "Product created successfully", productList });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating product", error: err.message });
  }
};
// Other functions (update, delete) can be added similarly
