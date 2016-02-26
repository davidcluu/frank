/*
 * GET Post Page
 */

var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}

// Render the page
exports.view = function(req, res) {
  res.render('submit', info);
};

exports.viewb = function(req, res) {
  res.render('submitbdesign', info);
};
