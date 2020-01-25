const router = require("express").Router();

const Item = require("../models/Item");

router
  .route("/")
  .get((req, res) => {
    const query = {};
    const category = req.query.category;
    const seller = req.query.seller;
    if (category) {
      query.category = category;
    }
    if (seller) {
      query.seller = seller;
    }
    Item.find(query)
      .then(items => {
        res.status(200).json(items);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  })
  .post((req, res) => {
    const item = new Item({
      _id: req.body._id,
      category: req.body.category,
      seller: req.body.seller,
      description: req.body.description
    });

    item
      .save()
      .then(success => {
        res.status(200).json(success);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router
  .route("/:category")
  .get((req, res) => {
    Item.find({ category: req.params.category })
      .then(items => {
        res.status(200).json(items);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  })
  .delete((req, res) => {
    Item.deleteMany({ category: req.params.category })
      .then(success => {
        if (!success.deletedCount) {
          res.status(400).json({ message: "No items deleted." });
          return;
        }
        res.status(200).json(success);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

module.exports = router;
