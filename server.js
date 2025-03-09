require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require('./config/db.js')
const authRoutes = require("./routes/authRoutes.js"); 
const productRoutes = require('./routes/productlistRoute')

const app = express();
app.use(express.json());
app.use(cors());
connection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Use user routes
app.use("/auth", authRoutes);
app.use('/productlists', productRoutes);

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
