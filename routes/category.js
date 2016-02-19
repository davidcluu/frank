/*
 * GET Category Page
 */


var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');


// Render the page
exports.view = function(req, res) {
  var categoryName = req.params.category;

  var category = {}
  for (var i = 0; i < categories.length; i++) {
    var cat = categories[i];
    if (cat.short && (cat.short == categoryName)) {
      category = cat;
    }
  }

  var renderPosts = [];
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    if (post['category-short'] == categoryName) {
      renderPosts.push(post);
    }
  }

  res.render('category', {
    'categories' : categories,
    'category' : category,
    'posts' : renderPosts
  });
};
