const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controllers
const transactionController = require("../controller/transaction.controller");

router.route("/").get(transactionController.getTransactions);

router.route("/sold").post(transactionController.postSoldTransaction);

router.route("/bought").post(transactionController.postBoughtTransaction);

module.exports = router;
