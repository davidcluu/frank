/*
 * GET Home Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('index', info);
};

// Categories to render
var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}