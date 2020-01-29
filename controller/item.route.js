const router = require("express").Router();

const Item = require("../models/Item");

const assignId = require("../helper/assignId");

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

router
  .route("/")
  .get((req, res) => {
    let query = {};
    const category = req.query.category;
    const seller = req.query.seller;
    if (category) {
      query = { "category.name": category.toUpperCase() };
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
  .post(async (req, res) => {
    const item = new Item({
      _id: await assignId(Item),
      category: {
        name: req.body.category.toUpperCase(),
        subCategory: req.body.type
      },
      seller: req.body.seller
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

router.route("/:_id").patch((req, res) => {
  Item.findByIdAndUpdate(req.params._id, { remainingPieces: req.body.boughtPieces })
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
