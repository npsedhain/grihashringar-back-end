const mongoose = require('mongoose');

const Transaction = require('./Transaction').schema;

const CustomerSchema = mongoose.Schema({
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
  transactions: [{ type: Number, ref: 'Transaction'}]
});

module.exports = mongoose.model('Customer', CustomerSchema);
