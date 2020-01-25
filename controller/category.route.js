const router = require("express").Router();

const Category = require("../models/Category");

const assignId = require("../helper/assignId");

router
  .route("/")
  .get((req, res) => {
    Category.find({})
      .then(categories => {
        res.status(200).json({ categories });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error, message: "Error while fetching categories." });
      });
  })
  .post(async (req, res) => {
    const category = new Category({
      _id: await assignId(Category),
      name: req.body.name.toUpperCase()
    });

    category
      .save()
      .then(success => {
        res.status(200).json(success);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router
  .route("/:id")
  .put((req, res) => {
    const { name } = req.body;
    Category.findByIdAndUpdate(
      req.params.id,
      { name: name.toUpperCase() },
      { new: true, useFindAndModify: false }
    )
      .then(success => {
        res.status(200).json({ success });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error, message: "Error updating the category." });
      });
  })
  .delete((req, res) => {
    Category.findByIdAndRemove(req.params.id, { useFindAndModify: false })
      .then(success => {
        res.status(200).json({ success });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error, message: "Error updating the category." });
      });
  });

module.exports = router;
