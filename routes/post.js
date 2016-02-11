/*
 * GET Post Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('post', sample_post);
};

// Post to render
var sample_post = require('./placeholders/post1.json');
