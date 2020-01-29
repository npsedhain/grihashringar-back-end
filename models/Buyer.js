const mongoose = require('mongoose');

const BuyerSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
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

module.exports = mongoose.model('Buyers', BuyerSchema);
