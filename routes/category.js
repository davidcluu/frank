/*
 * GET Category Page
 */

// Render the page
exports.view = function(req, res) {
  var category = req.params.category;
  res.render('category', {
    'category' : category,
    'posts' : posts
  });
};

// Post previews to render
var posts = [
  {
    'title' : 'Sample Pants',
    'img-src' : '/images/sample-pants.jpg',
    'upvotes' : 69,
    'downvotes' : 96,
  },
  {
    'title' : 'Sample Pants',
    'img-src' : '/images/sample-pants.jpg',
    'upvotes' : 69,
    'downvotes' : 96,
  }
]
