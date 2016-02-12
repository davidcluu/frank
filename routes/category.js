/*
 * GET Category Page
 */

// Render the page
exports.view = function(req, res) {
  var category = req.params.category;
  res.render('category', {
    'categories' : categories,
    'category' : category,
    'posts' : posts
  });
};

var categories = require('./placeholders/categories.json');

var post1 = require('./placeholders/post1.json');
var post2 = require('./placeholders/post2.json');
var post3 = require('./placeholders/post3.json');
var post4 = require('./placeholders/post4.json');

// Post previews to render
var posts = [
  post1,
  post2,
  post3,
  post4
]
