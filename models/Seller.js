const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  vatNumber: {
    type: Number
  },
  location: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Sellers", SellerSchema);
