/*
 * GET bdesign Page
 */

var categories = require('./placeholders/categories.json');

var info = {
  'categories' : categories
}

// Render the page
exports.view = function(req, res) {
  res.render('bdesign', info);
};
