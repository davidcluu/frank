/*
 * GET Home Page
 */

var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');

var info = {
  'categories' : categories,
  'category' : categories[0],
  'posts' : posts
}

// Render the page
exports.view = function(req, res) {
  res.render('index', info);
};
