const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  collectionName: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("permission", permissionSchema)
