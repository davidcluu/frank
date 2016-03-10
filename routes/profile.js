/*
 * GET Profile Page
 */
var models = require('../models');
var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');

var user = require('./placeholders/user.json');

// Render the page
exports.view = function(req, res) {
  renderPage(res, 'profile');
};

exports.viewb = function(req, res) {
  renderPage(res, 'profilebdesign');
};

function renderPage(res, pageToRender) {
  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

    var username = user['username'];

    models.Post
      .find({'user' : user.id})
      .populate('user')
      .populate('category')
      .populate('comments')
      .sort('-upvotes')
      .exec(function(err, userPosts) {
        if (userPosts < 1) {
          var noPosts = "No Posts to display. Try submitting one!";
        }

        var info = {
          'username' : username,
          'categories' : categories,
          'category' : categories[0],
          'posts' : userPosts,
          'noPosts' : noPosts
        }

        res.render(pageToRender, info);
      });
  }
}
