const mongoose = require("mongoose");

const Item = require("../models/Item");
const Customer = require("../models/Customer");
const Supplier = require("../models/Supplier");
const Transaction = require("../models/Transaction");

const assignId = require("../helper/assignId");

const getTransactions = (req, res) => {
  const pageNo = parseInt(req.query.pageNo);
  const pageSize = parseInt(req.query.pageSize);
  let query = {};

  if (pageNo < 0 || pageNo === 0) {
    res.status(400).json({
      error: true,
      message: "Invalid page number, should start with 1."
    });
    return;
  }

  const skip = pageSize * (pageNo - 1);
  const limit = pageSize;

  Transaction.find(query, {}, { skip, limit })
    .then(success => {
      res.status(200).json({
        success
      });
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: "Error finding the transactions."
      });
    });
};

const postSoldTransaction = async (req, res) => {
  if (!req.body.soldPieces) {
    res.status(400).json({
      message: "Please enter the number of pieces sold."
    });
    return;
  }

  if (!req.body.customerId) {
    res.status(400).json({
      message: "Please enter values in the customer field."
    });
    return;
  }

  const transaction = new Transaction({
    _id: await assignId(Transaction),
    itemId: req.body.itemId,
    itemCategory: req.body.category,
    billNumber: req.body.billNumber,
    billAmount: req.body.billAmount,
    transactionAmount: req.body.transactionAmount,
    soldPieces: req.body.soldPieces,
    customer: req.body.customerName,
    customerId: req.body.customerId
  });

  const item = await Item.findById(req.body.itemId);

  if (!item || !item.remainingPieces || item.remainingPieces <= 0) {
    res.status(400).json({
      message: "You have no items remaining to sell."
    });
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  const options = { session, new: true };

  item
    .updateOne(
      {
        remainingPieces: item.remainingPieces - req.body.soldPieces,
        soldPieces: item.soldPieces + req.body.soldPieces || req.body.soldPieces
      },
      options
    )
    .then(() => {
      Customer.findByIdAndUpdate(
        req.body.customerId,
        { $push: { transactions: transaction._id } },
        { new: true, useFindAndModify: false },
        async (error, success) => {
          if (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({
              error,
              message: "Error updating the customer transaction."
            });
            return;
          }
          transactionsa
            .save()
            .then(async success => {
              await session.commitTransaction();
              session.endSession();
              res.status(200).json({
                success,
                message: "Transaction successful."
              });
            })
            .catch(async error => {
              await session.abortTransaction();
              session.endSession();
              res.status(500).json({
                error,
                message: "Error saving the transaction."
              });
            });
        }
      );
    })
    .catch(async error => {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ error, message: "Error updating the item." });
    });
};

const postBoughtTransaction = async (req, res) => {
  if (!req.body.boughtPieces) {
    res.status(400).json({
      message: "Please enter the number of pieces bought."
    });
    return;
  }

  if (!req.body.supplierId) {
    res.status(400).json({
      message: "Please enter values in the supplier field."
    });
    return;
  }

  const transaction = new Transaction({
    _id: await assignId(Transaction),
    itemId: req.body.itemId,
    itemCategory: req.body.category,
    billNumber: req.body.billNumber,
    billAmount: req.body.billAmount,
    transactionAmount: req.body.transactionAmount,
    boughtPieces: req.body.boughtPieces,
    supplier: req.body.supplierName,
    supplierId: req.body.supplierId
  });

  const item = await Item.findById(req.body.itemId);

  let remaining;
  if (!item.remainingPieces) {
    remaining = req.body.boughtPieces;
  } else {
    remaining = item.remainingPieces + req.body.boughtPieces;
  }

  item
    .updateOne({
      remainingPieces: remaining
    })
    .then(() => {
      Supplier.findByIdAndUpdate(
        req.body.supplierId,
        { $push: { transactions: transaction._id } },
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
            message: "Error updating the supplier transaction."
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
