const mongoose = require("mongoose")

const dayOfWorkSchema = new mongoose.Schema({
  doctor: { type: mongoose.Types.ObjectId, ref:"user", required: true },
  dayOfWork: [{
    name: { type: String, required: true },
    order: { type: Number, order: 1 },
  }]
}, { timestamps: true })

module.exports = mongoose.model("dayOfWork", dayOfWorkSchema)
