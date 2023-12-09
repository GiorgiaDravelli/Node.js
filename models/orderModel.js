const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.statics.findById = function (userID) {
  return this.findOne({ userID: userID });
};

OrderSchema.statics.findByIdAndDate = function (userId, targetDate) {
  return this.findOne({
    userID: userId,
    createdAt: {
      $gte: targetDate,
      $lt: new Date(targetDate.getTime() + 86400000),
    },
  });
};


module.exports = mongoose.model("Order", OrderSchema);