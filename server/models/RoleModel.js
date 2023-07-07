const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{
    type: mongoose.Types.ObjectId,
    ref: "permission",
    required: true
  }]
}, { timestamps: true })

module.exports = mongoose.model("role", roleSchema);