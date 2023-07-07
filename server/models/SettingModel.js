const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({
  logo: {
    data: Buffer, // binary data of the image
    contentType: String // MIME type of the image
  },
  cons_price: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("setting", settingSchema)
