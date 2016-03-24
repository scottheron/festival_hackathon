var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/user');

var secret = "dinosaurs";
mongoose.connect('mongodb://localhost/restaurants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);