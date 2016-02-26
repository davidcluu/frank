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

var user = require('./placeholders/user.json');

exports.login = function(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  user["username"] = username;
  user["password"] = password;

  if (isB) {
    res.redirect('/b');
  }
  else {
    res.redirect('/');
  }
}
