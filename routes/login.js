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
      currUser["username"] = username;
      currUser["password"] = password;

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
