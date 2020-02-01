const Item = require("../models/Item");
const assignId = require("../helper/assignId");

const getItems = (req, res) => {
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
};

const postItem = async (req, res) => {
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
};

const editItem = (req, res) => {
  Item.findByIdAndUpdate(req.params._id, { remainingPieces: req.body.boughtPieces })
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = {
  getItems,
  postItem,
  editItem
}