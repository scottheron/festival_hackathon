var express = require('express');
var Restaurant = require('../models/restaurant');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');



router.route('/')
  .get(function(req, res) {
    Restaurant.find(function(err, restaurants) {
      if (err) return res.status(500).send(err);
      res.send(restaurants);
    });
  })
  .post(function(req, res) {

    console.log(req.body);
    Restaurant.create(titleArray, function(err, restaurant) {
      if (err) return res.status(500).send(err);
      res.send(restaurant);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Restaurant.findById(req.params.id, function(err, restaurant) {
      if (err) return res.status(500).send(err);
      res.send(restaurant);
    });
  })
  .put(function(req, res) {
    Restaurant.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Restaurant.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });


module.exports = router;