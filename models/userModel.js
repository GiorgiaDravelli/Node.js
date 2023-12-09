const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    surname: { type: String, required: false },
    email: { type: String, required: true },
});

UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

module.exports = mongoose.model("User", UserSchema);