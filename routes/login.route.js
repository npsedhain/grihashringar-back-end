const router = require("express").Router();

// Load controllers
const loginController = require('../controller/login.controller');

router.route("/").post(loginController.loginUser);

module.exports = router;
