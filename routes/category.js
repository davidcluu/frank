/*
 * GET Category Page
 */
var models = require('../models');

var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');


// Render the page
exports.view = function(req, res) {
  renderPage(req, res, 'category');
};

exports.viewb = function(req, res) {
  renderPage(req, res, 'categorybdesign');

};

function renderPage(req, res, pageToRender) {
  var categoryName = req.params.category;

  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

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

    var info = {
      'categories' : categories,
      'category' : category,
      'posts' : renderPosts
    }

    res.render(pageToRender, info);
  }
}
