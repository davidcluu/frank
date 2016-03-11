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

  models.Post
    .find()
    .populate('category')
    .find({'category': categoryToID(categoryName)})
    .populate('user')
    .exec(function(err, post) {
      models.Category
        .find()
        .sort('_id')
        .exec(afterQuery);

      function afterQuery(err, categories) {
        if(err) console.log(err);
        
        var info = {
          'categories' : categories,
          'category' : categoryName,
          'posts' : post
        }

        res.render(pageToRender, info);
      }
    });
}

function categoryToID(category) {
  switch (category) {
    case 'clothing': return 1;
    case 'shoes': return 2;
    case 'accessories': return 3;
    case 'makeup': return 4;
    case 'hairstyles': return 5;
    case 'facialhair': return 6;
    default: console.log("error!");
  }
}
