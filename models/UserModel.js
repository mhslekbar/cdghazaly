const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  roles: [{ type: mongoose.Types.ObjectId, ref: "role", required: true }],
  doctor: { 
    cabinet: { type: String },
    percentage: { type: String },
  }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema);

