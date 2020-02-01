const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controllers
const transactionController = require('../controller/transaction.controller');

router
  .route("/sold")
  .get((req, res) => {})
  .post(transactionController.postSoldTransaction);

router
  .route("/bought")
  .get((req, res) => {})
  .post(transactionController.postBoughtTransaction);

module.exports = router;
