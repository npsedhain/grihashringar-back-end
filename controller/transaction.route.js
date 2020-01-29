const router = require("express").Router();

const Item = require("../models/Item");
const Buyer = require("../models/Buyer");
const Transaction = require("../models/Transaction");

const assignId = require("../helper/assignId");

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

router
  .route("/sold")
  .get((req, res) => {})
  .post(async (req, res) => {
    let transaction = new Transaction({
      _id: await assignId(Transaction),
      itemId: req.body.itemId,
      billNumber: req.body.billNumber,
      billAmount: req.body.billAmount,
      transactionAmount: req.body.transactionAmount,
      soldPieces: req.body.soldPieces,
      sellerId: 0,
      buyerId: req.body.buyerId
    });

    try {
      const item = await Item.findById(req.body.itemId);
      await item.updateOne({
        remainingPieces: item.remainingPieces - req.body.soldPieces,
        soldPieces: item.soldPieces + req.body.soldPieces || req.body.soldPieces
      });
      await Buyer.findByIdAndUpdate(
        req.body.buyerId,
        { $push: { transactions: req.body.billNumber } },
        { new: true, useFindAndModify: false }
      );
      await transaction.save();
      res.send('ok');
    } catch (error) {
      res
        .status(500)
        .json({
          error,
          message: "Error completing the transaction. Please try again."
        });
    }
  });

router
  .route("/bought")
  .get((req, res) => {})
  .post(async (req, res) => {
    const transaction = new Transaction({
      _id: await assignId(Transaction),
      billNumber: req.body.billNumber,
      billAmount: req.body.billAmount
    });

    transaction
      .save()
      .then(success => {
        res.status(200).json(success);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;
