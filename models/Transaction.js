const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  bill_number: {
    type: Number,
    required: true
  },
  bill_amount: {
    type: Number,
    required: true
  },
  // the amount that was either received or given during the transaction.
  transaction_amount: {
    type: Number,
    required: true
  },
  payee: {
    type: String,
    required: true
  },
  payer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Transactions', TransactionSchema);
