const express = require("express");
const router = express.Router();
const userController = require("../controls/userController");

// Route per creare un nuovo utente
router.post("/", userController.createUser);

// Route per ottenere tutti gli utenti
router.get("/", userController.getAllUsers);

// Route per ottenere un utente per email;
router.get("/:email", userController.getUserByEmail);

// Route per aggiornare un utente per email
router.put("/:email", userController.updateUser);

// Route per eliminare un utente per email
router.delete("/:email", userController.deleteUser);

module.exports = router;