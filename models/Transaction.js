const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  itemCategory: {
    type: String,
    // required: true
  },
  itemId: {
    type: Number,
    required: true
  },
  billNumber: {
    type: Number,
    unique: true,
    // required: true
  },
  billAmount: {
    type: Number,
    required: true
  },
  soldPieces: {
    type: Number
  },
  boughtPieces: {
    type: Number
  },
  // the amount that was either received or given during the transaction.
  transactionAmount: {
    type: Number,
    // required: true
  },
  // item's bought price - sold price(bill amount)
  profit: {
    type: Number
  },
  // when clicked should give seller over view
  seller: {
    type: String
  },
  sellerId: {
    type: Number
  },
  // when clicked should give buyer over view
  buyer: {
    type: String
  },
  buyerId: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Transactions", TransactionSchema);
