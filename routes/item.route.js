const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controller
const itemController = require('../controller/item.controller');

router
  .route("/")
  .get(itemController.getItems)
  .post(itemController.postItem);

router.route("/:_id").patch(itemController.editItem);

module.exports = router;
