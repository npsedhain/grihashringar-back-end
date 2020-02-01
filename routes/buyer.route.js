const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controllers
const buyerController = require('../controller/buyer.controller');

router
  .route("/")
  .get(buyerController.getBuyers)
  .post(buyerController.postBuyer);

module.exports = router;
