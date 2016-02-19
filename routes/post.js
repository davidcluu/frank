/*
 * GET Post Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('post', info);
};

var categories = require('./placeholders/categories.json');

// Post to render
var sample_post = require('./placeholders/post1.json');


var info = {
  'categories' : categories,
  'post' : sample_post
}
