const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors())

mongoose.connect('mongodb://localhost/my-shopee-db');

const Product = mongoose.model('products', new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String]
}));

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProd = new Product(req.body);
  const product = await newProd.save();
  res.send(product);
});

app.delete("/api/products/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.send(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor My-Shopee rodando na porta ${port}`));
