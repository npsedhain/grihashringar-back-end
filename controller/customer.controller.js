const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");

const assignId = require("../helper/assignId");

const getCustomers = (req, res) => {
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

  Customer.find(query, {}, { skip, limit })
    .then(customers => {
      res.status(200).json({ customers });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: "Error while fetching customers." });
    });
};

const postCustomer = async (req, res) => {
  const customer = new Customer({
    _id: await assignId(Customer),
    name: req.body.name,
    location: req.body.location,
    mobile: req.body.mobile
  });

  customer
    .save()
    .then(success => {
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

const getCustomer = (req, res) => {
  Customer.findById(req.params._id)
    .then(customer => {
      Transaction.find({
        _id: {
          $in: customer.transactions
        }
      }).then(transactions => {
        res.json({ customer, transactions });
      });
    })
    .catch(error => {
      res.status(400).json({
        error,
        message: "Couldn't find the customer."
      });
    });
};

module.exports = {
  getCustomers,
  postCustomer,
  getCustomer
};
