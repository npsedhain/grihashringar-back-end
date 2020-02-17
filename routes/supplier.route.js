const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controllers
const supplierController = require('../controller/supplier.controller');

router
  .route("/")
  .get(supplierController.getSuppliers)
  .post(supplierController.postSupplier);

module.exports = router;
