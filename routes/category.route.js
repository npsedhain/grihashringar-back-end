const router = require("express").Router();

// authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
router.use(isAuthenticated);

// Load controller
const categoryController = require('../controller/category.controller');

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.postCategory);

router
  .route("/:id")
  .put(categoryController.editCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
