var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var secret = "dinosaurs";
var mongoose = require('mongoose');
var User = require('./models/user');
var Restaurant = require('./models/restaurant');
var request = require('request');
var cheerio = require('cheerio');
var titleArray = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/restaurants', expressJWT({secret: secret})); //using middleware on api/recipes, passing in our secret, protecting this route
app.use('/api/users', expressJWT({secret: secret}) //same as above unless posting as seen on below line, which allows you to make an account
.unless({path: ['/api/users'], method: 'post'}));

app.use('/api/restaurants', require('./controllers/restaurants'));
app.use('/api/users', require('./controllers/users'));

app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);


