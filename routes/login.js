/*
 * GET Post Page
 */

var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}

// Render the page
exports.view = function(req, res) {
  res.render('login', info);
};

var user = require('./placeholders/user.json');

exports.login = function(req, res) {
  var username = req.query.username;
  var password = req.query.password;

  user["username"] = username;
  user["password"] = password;

  res.redirect('/');
}
