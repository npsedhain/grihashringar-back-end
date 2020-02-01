const Buyer = require("../models/Buyer");
const assignId = require("../helper/assignId");

const getBuyers = (req, res) => {
  Buyer.find({})
    .then(buyers => {
      res.status(200).json({ buyers });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Error while fetching buyers." });
    });
};

const postBuyer = async (req, res) => {
  console.log(req.body)
  const buyer = new Buyer({
    _id: await assignId(Buyer),
    name: req.body.name
  });

  buyer
    .save()
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = {
  getBuyers,
  postBuyer
};