const Category = require("../models/Category");
const assignId = require("../helper/assignId");

const getCategories = (req, res) => {
  Category.find({})
    .then(categories => {
      res.status(200).json({ categories });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Error while fetching categories." });
    });
};

const postCategory = async (req, res) => {
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
};

const editCategory = (req, res) => {
  const { type } = req.body;
  Category.findByIdAndUpdate(
    req.params.id,
    { $push: { type } },
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
};

const deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    .then(success => {
      res.status(200).json({ success });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Error updating the category." });
    });
};

module.exports = {
  getCategories,
  postCategory,
  editCategory,
  deleteCategory
};