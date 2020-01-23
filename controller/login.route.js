const router = require('express').Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router
  .route('/')
  .post((req, res, next) => {
    let errors = [];
    const { username, password } = req.body;
    if (!username) {
      errors.push('Please enter your username.');
    }
    if (!password) {
      errors.push('Please enter your password.');
    }
    if (errors.length) {
      res.json({ message: errors });
      return;
    } else {
      //validation passed

    }
  });

  module.exports = router;
