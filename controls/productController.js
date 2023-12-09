const Product = require("../models/productModel"); 

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = new Product({ name });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to create the product." });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve products." });
  }
};

// Get a product by name
exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findByName(name);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve the product." });
  }
};

// Update a product by name
exports.updateProduct = async (req, res) => {
try {
    const nameToUpdate = req.params.name;
    const updates = req.body;
    const product = await Product.findOne({ name: nameToUpdate });

    if (!product) {
    return res.status(404).json({ error: "Product not found." });
    }

    if (updates.name) {
    product.name = updates.name;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
} catch (error) {
    res.status(500).json({ error: "Unable to update the product." });
}
};

// Delete a product by name
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ name: req.params.name });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the product." });
  }
};