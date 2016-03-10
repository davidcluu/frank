/*
 * GET Post Page
 */

var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}

// Render the page
var isB = false;

exports.view = function(req, res) {
  res.render('login', info);
};

exports.viewb = function(req, res) {
  isB = true;
  res.render('loginbdesign', info);
};

/**
 * POST Login
 */
var models = require('../models');
var currUser = require('./placeholders/user.json');

exports.login = function(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  models.User
    .find({
      'username' : username,
      'password' : password
    })
    .exec(attemptLogin);

  function attemptLogin(err, queryRes) {
    if(err) console.log(err);

    // Invalid username
    if (queryRes.length == 0) {
      console.log('Invalid username or password');

      errRedirect();
    }
    // Successful login
    else {
      currUser.id = queryRes[0]['_id'];
      currUser.username = queryRes[0].username;
      currUser.password = queryRes[0].password;
      currUser.submitted_posts = queryRes[0].submitted_posts;
      currUser.liked_posts = queryRes[0].liked_posts;

      sucRedirect();
    }

    function sucRedirect() {
      if (isB) {
        res.redirect('/b');
      }
      else {
        res.redirect('/');
      }      
    }

    function errRedirect() {
      if (isB) {
        res.redirect('/loginb');
      }
      else {
        res.redirect('/login');
      }
    }
  }
}
