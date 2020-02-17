const Supplier = require("../models/Supplier");
const assignId = require("../helper/assignId");

const getSuppliers = (req, res) => {
  Supplier.find({})
    .then(suppliers => {
      res.status(200).json({ suppliers });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Error while fetching suppliers." });
    });
};

const postSupplier = async (req, res) => {
  const supplier = new Supplier({
    _id: await assignId(Supplier),
    name: req.body.name
  });

  supplier
    .save()
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = {
  getSuppliers,
  postSupplier
};
