const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Import controllers
const adminController = require('../controller/admin.controller');

router
  .route("/")
  .get(adminController.getAdmins)
  .post(adminController.postAdmin);

router.route("/:_id").delete(adminController.deleteAdmin);

module.exports = router;
