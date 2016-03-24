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

    request('https://news.ycombinator.com/', function (error, response, data) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data);

      // $('.title a').each(function(index, element) {
      //   console.log($(element).attr("href"))
      // })

      var links = $('.title a').map(function(index, element) {
        return {link: $(this).text(), url: $(this).attr("href")}
      }).get();

      console.log(links);

    }
  });
   
    console.log(req.body);
    Restaurant.create(req.body, function(err, restaurant) {
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