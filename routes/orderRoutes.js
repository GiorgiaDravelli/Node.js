const express = require("express");
const router = express.Router();
const orderController = require("../controls/orderController");

// Route per creare un nuovo prodotto
router.post("/", orderController.createOrder);

// Route per ottenere tutti gli ordini
router.get("/", orderController.getAllOrders);

// Route per ottenere tutti gli ordini
router.get("/all/:date", orderController.getAllOrdersbyDate);

// Route per ottenere gli ordini per utente;
router.get("/:userId", orderController.getOrderByUser);

// Route per ottenere gli ordini per utente filtrati per data
router.get("/users/:email/orders/:date", orderController.getOrdersByUserAndDate);

// Route per aggiornare un ordine per id
router.put("/:id", orderController.updateOrder);

// Route per eliminare un prodotto per id
router.delete("/:id", orderController.deleteOrder);


module.exports = router;