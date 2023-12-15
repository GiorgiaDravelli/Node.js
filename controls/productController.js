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
    const page = req.query.page || 0
    const productsPerPage = 5
    const products = await Product.find().skip(page * productsPerPage).limit(productsPerPage);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve products." });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve the product." });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const product = await Product.findOne({ id: idToUpdate });

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

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the product." });
  }
};