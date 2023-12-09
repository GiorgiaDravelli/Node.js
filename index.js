const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

mongoose.connect('mongodb://127.0.0.1/orizondb')
.then(()=> console.log('Connected to the server...'))
.catch(err=> console.error('Failed to connect to the server. ' + err))



app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use((req, res, next) => {
  res.status(404).send("api not found");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

module.exports = app;