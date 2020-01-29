const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  itemId: {
    type: Number,
    required: true
  },
  billNumber: {
    type: Number,
    required: true
  },
  billAmount: {
    type: Number,
    required: true
  },
  // the amount that was either received or given during the transaction.
  transactionAmount: {
    type: Number,
    required: true
  },
  sellerId: {
    type: Number,
    required: true
  },
  buyerId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Transactions", TransactionSchema);
