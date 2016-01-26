var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get("/", function(req, res, next) {
  var foundPages = [];
  Page.find().exec()
  .then(function(result) {
    res.render('index.html', {pages: result});
  });
  
});

module.exports = router;

