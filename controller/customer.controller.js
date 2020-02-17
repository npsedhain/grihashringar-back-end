const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");

const assignId = require("../helper/assignId");

const getCustomers = (req, res) => {
  Customer.find({})
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
    location: req.body.location
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
