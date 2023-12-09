const express = require("express");
const router = express.Router();
const productController = require("../controls/productController");

// Route per creare un nuovo prodotto
router.post("/", productController.createProduct);

// Route per ottenere tutti gli utenti
router.get("/", productController.getAllProducts);

// Route per ottenere un prodotto per nome;
router.get("/:name", productController.getProductByName);

// Route per aggiornare un prodotto per nome
router.put("/:name", productController.updateProduct);

// Route per eliminare un prodotto per nome
router.delete("/:name", productController.deleteProduct);

module.exports = router;