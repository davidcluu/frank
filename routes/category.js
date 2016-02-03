/*
 * GET Category Page
 */

// Render the page
exports.view = function(req, res) {
  var category = req.params.category;
  res.render('category', {
    'category' : category
  });
};