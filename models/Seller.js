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
    type: String
  },
  mobile: {
    type: String
  },
  transactions: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Sellers", SellerSchema);
