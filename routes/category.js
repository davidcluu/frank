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
    'title' : 'This is a very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long description testing truncate.',
    'img-src' : '/images/temp/sample-pants.jpg',
    'upvotes' : 100,
    'downvotes' : 20,
  },
  {
    'title' : 'Sample T-Shirt',
    'img-src' : '/images/temp/sample-shirt.jpg',
    'upvotes' : 99,
    'downvotes' : 30,
  },
  {
    'title' : 'Sample Outfit',
    'img-src' : '/images/temp/sample-outfit.jpg',
    'upvotes' : 98,
    'downvotes' : 40,
  },
  {
    'title' : 'Sample Shoes',
    'img-src' : '/images/temp/sample-shoes.jpg',
    'upvotes' : 97,
    'downvotes' : 50,
  }
]
