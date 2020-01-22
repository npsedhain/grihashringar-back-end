const router = require('express').Router();

const Admin = require('../models/Admin');
const assignId = require('../helper/assignId');

router
  .route('/')
  .get((req, res) => {
    Admin.find()
      .then(admins => {
        res.status(200).json(admins);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  })
  .post(async(req, res) => {
    const { username, password } = req.body;
    const _id = await assignId(Admin);
    if (_id !== null) {
      const admin = new Admin({
        _id,
        username,
        password
      });
      admin.save()
        .then(success => {
          res.status(200).json(success);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    }
  });

  router
    .route('/:_id')
      .delete((req, res) => {
        const _id = req.params._id;
        Admin.deleteOne({_id})
          .then(success => {
            if (!success.deletedCount) {
              res.status(400).json({message: "No entries found to be deleted."});
              return;
            }
            res.status(200).json(success);
          })
          .catch(error => {
            res.status(400).json(error);
          })
      });

  module.exports = router;
