// controllers/productlistController.js
const ProductList = require("../models/productlistModel");
const fs = require("fs");

// Get all product list
exports.getAllProducts = async (req, res) => {
  try {
    const product = await ProductList.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  const productlist = new ProductList({ name, price, description, image });
  try {
    await productlist.save();
    res
      .status(201)
      .json({ message: "Product created successfully", productlist });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating product", error: err.message });
  }
};

// Bulk upload from JSON
exports.addFromJSON = async (req, res) => {
  fs.readFile("../products.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send("Error reading the file");
    }

    const products = JSON.parse(data);

    ProductList.insertMany(products)
      .then(() => {
        console.log("Data imported successfully");
        res.status(200).send("Data imported successfully");
      })
      .catch((error) => {
        console.error("Error importing data:", error);
        res.status(500).send("Error importing data");
      });
  });
};
// Other functions (update, delete) can be added similarly
