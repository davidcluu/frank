/*
 * GET Category Page
 */

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

  if (category.short == "clothing") {
    res.render('category', {
      'categories' : categories,
      'category' : category,
      'posts' : clothing_posts
    });
  }
  else if (category.short == "shoes") {
    res.render('category', {
      'categories' : categories,
      'category' : category,
      'posts' : shoe_posts
    });
  }
  else {
    res.render('category', {
      'categories' : categories,
      'category' : category,
      'posts' : []
    });
  }
};

var categories = require('./placeholders/categories.json');

// Clothing
var post1 = require('./placeholders/post1.json');
var post2 = require('./placeholders/post2.json');
var post3 = require('./placeholders/post3.json');

var clothing_posts = [
  post1,
  post2,
  post3
]

// Shoes
var post4 = require('./placeholders/post4.json');

var shoe_posts = [
  post4
]
