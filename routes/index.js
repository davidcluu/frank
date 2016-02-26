/*
 * GET Home Page
 */

var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');

var user = require('./placeholders/user.json');

var info = {
  'categories' : categories,
  'category' : categories[0],
  'posts' : posts
}

// Render the page
exports.view = function(req, res) {
  // Not logged in
  if ( isEmptyObject(user) ) {
    res.redirect('/login');
  }
  // Logged in
  else {
    res.render('index', info);
  }
};

exports.viewb = function(req, res) {
  // Not logged in
  if ( isEmptyObject(user) ) {
    res.redirect('/loginb');
  }
  // Logged in
  else {
    res.render('indexbdesign', info);
  }
};

function isEmptyObject(obj) {
  return Object.keys(obj).length == 0;
}
