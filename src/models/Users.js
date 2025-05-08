const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true }, // رقم الهاتف
    password: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true } // قبول الشروط
});

module.exports = mongoose.model("User", UserSchema);