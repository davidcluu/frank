/*
 * GET Home Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('index', info);
};

// Categories to render
var categories = require('./placeholders/categories.json');

var post1 = require('./placeholders/post1.json');
var post2 = require('./placeholders/post2.json');
var post3 = require('./placeholders/post3.json');
var post4 = require('./placeholders/post4.json');

var posts = [
  post1,
  post2,
  post3,
  post4
]

var info = {
  'categories' : categories,
  'category' : categories[0],
  'posts' : posts
}
