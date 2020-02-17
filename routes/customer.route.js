const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controllers
const customerController = require('../controller/customer.controller');

router
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.postCustomer);

router
  .route('/:_id')
  .get(customerController.getCustomer);

module.exports = router;
