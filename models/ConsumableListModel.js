const mongoose = require("mongoose");

const consumableListSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("consumableList", consumableListSchema)
