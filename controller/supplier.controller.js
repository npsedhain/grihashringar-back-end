const Supplier = require("../models/Supplier");
const assignId = require("../helper/assignId");

const getSuppliers = (req, res) => {
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

  Supplier.find(query, {}, { skip, limit })
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
};

module.exports = {
  getSuppliers,
  postSupplier
};
