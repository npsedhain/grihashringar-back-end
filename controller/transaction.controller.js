const Item = require("../models/Item");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
const Transaction = require("../models/Transaction");

const assignId = require("../helper/assignId");

const getTransactions = (req, res) => {
  let query = {};

  Transaction.find(query).then(success => {
    res.status(200).json({
      success
    })
  }).catch(error => {
    res.status(500).json({
      error,
      message: "Error finding the transactions."
    })
  });
};

const postSoldTransaction = async (req, res) => {
  const transaction = new Transaction({
    _id: await assignId(Transaction),
    item: {
      _id: req.body.itemId,
      name: req.body.itemName,
      category: req.body.category
    },
    billNumber: req.body.billNumber,
    billAmount: req.body.billAmount,
    transactionAmount: req.body.transactionAmount,
    soldPieces: req.body.soldPieces,
    seller: {
      _id: 0
    },
    buyer: {
      _id: req.body.buyerId,
      name: req.body.buyerName
    }
  });

  const item = await Item.findById(req.body.itemId);

  item
    .updateOne({
      remainingPieces: item.remainingPieces - req.body.soldPieces,
      soldPieces: item.soldPieces + req.body.soldPieces || req.body.soldPieces
    })
    .then(() => {
      Buyer.findByIdAndUpdate(
        req.body.buyerId,
        { $push: { transactions: req.body.billNumber } },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          transaction
            .save()
            .then(success => {
              res.status(200).json({
                success,
                message: "Transaction successful."
              });
            })
            .catch(error => {
              res.status(500).json({
                error,
                message: "Error saving the transaction."
              });
            });
        })
        .catch(error => {
          res.json(500).json({
            error,
            message: "Error updating the buyer transaction."
          });
        });
    })
    .catch(error => {
      res.json(500).json({ error, message: "Error updating the item." });
    });
};

const postBoughtTransaction = async (req, res) => {
  const transaction = new Transaction({
    _id: await assignId(Transaction),
    item: {
      _id: req.body.itemId,
      name: req.body.itemName,
      category: req.body.category
    },
    billNumber: req.body.billNumber,
    billAmount: req.body.billAmount,
    transactionAmount: req.body.transactionAmount,
    boughtPieces: req.body.boughtPieces,
    seller: {
      _id: req.body.sellerId,
      name: req.body.sellerName
    },
    buyer: {
      _id: 0
    }
  });

  const item = await Item.findById(req.body.itemId);

  item
    .updateOne({
      remainingPieces: item.remainingPieces + req.body.boughtPieces
    })
    .then(() => {
      Seller.findByIdAndUpdate(
        req.body.sellerId,
        { $push: { transactions: req.body.billNumber } },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          transaction
            .save()
            .then(success => {
              res.status(200).json({
                success,
                message: "Transaction successful."
              });
            })
            .catch(error => {
              res.status(500).json({
                error,
                message: "Error saving the transaction."
              });
            });
        })
        .catch(error => {
          res.json(500).json({
            error,
            message: "Error updating the buyer transaction."
          });
        });
    })
    .catch(error => {
      res.json(500).json({ error, message: "Error updating the item." });
    });
};

module.exports = {
  getTransactions,
  postSoldTransaction,
  postBoughtTransaction
};
