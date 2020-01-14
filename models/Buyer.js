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
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Buyers', BuyerSchema);
