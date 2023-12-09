const User = require("../models/userMsodel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1/orizondb')
.then(()=> console.log('Connected to the server...'))
.catch(err=> console.error('Failed to connect to the server. ' + err))

const usersData = [
  { name: "Paolo", surname: "Rossi", email: "paolo@rossi.com" },
  { name: "Anna", surname: "Neri", email: "anna@neri.com" },
  { name: "Carla", surname: "Carli", email: "carla@carli.com" },
];

const productsData = [
  { name: "Milano-Lecce" },
  { name: "Parigi-Torino" },
  { name: "Parma-Napoli" },
];

const populateData = async () => {
  try {
    await User.insertMany(usersData);

    await Product.insertMany(productsData);

    console.log("Dati fittizi inseriti con successo!");
  } catch (error) {
    console.error("Errore durante l'inserimento dei dati fittizi:", error);
  } finally {
    mongoose.connection.close();
  }
};

exports.populateData;