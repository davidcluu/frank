/*
 * GET Post Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('login', info);
};

var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}
