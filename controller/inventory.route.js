const router = require('express').Router();

const Inventory = require('../models/Inventory');

router
  .route('/')
  .get((req,res) => {
    Inventory.find()
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        res.json(err);
      });
  })
  .post((req,res) => {
    const item = new Inventory({
      _id: 1,
      category: req.body.category,
      description: req.body.description
    });

    item.save()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.route('/:category')
    .get((req,res) => {
      Inventory.find({category: req.params.category})
        .then(sofas => {
          res.status(200).json(sofas);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    });

module.exports = router;
