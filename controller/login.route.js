const router = require('express').Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

router
  .route('/')
  .post((req, res) => {
    const reqAdmin = {
      username: req.body.username
    };
    res.send({message: 'You are trying to log in.'});
  });

  module.exports = router;
