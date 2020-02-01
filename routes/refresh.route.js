const router = require("express").Router();

// load Controller
const refreshController = require('../controller/refresh.controller');

router.route("/").post(refreshController.getRefreshToken);

module.exports = router;
