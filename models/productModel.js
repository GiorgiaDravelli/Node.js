const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

ProductSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};


module.exports = mongoose.model("Product", ProductSchema);