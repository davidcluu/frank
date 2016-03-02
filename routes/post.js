/*
 * GET Post Page
 */
var models = require('../models');

// Render the page
exports.view = function(req, res) {
  renderPage(req, res, 'post');
};

exports.viewb = function(req, res) {
  renderPage(req, res, 'postbdesign');
};

function renderPage(req, res, pageToRender) {
  var category = req.params.category;
  var id = req.params.id;
  var title_cut = req.params.title_cut;

  models.Post
    .find({
      '_id': id
    })
    .populate('user')
    .populate('category')
    .populate('comments')
    .exec(function(err, post) {
      models.Category
        .find()
        .sort('_id')
        .exec(afterQuery);

      function afterQuery(err, categories) {
        if(err) console.log(err);

        var info = {
          'categories' : categories,
          'post' : post[0]
        }

        console.log(post);

        res.render(pageToRender, info);
      }
    });
}


var data = require("./placeholders/post1.json");

exports.post = function(req, res) { 
  var comment = req.body.comment;
  var url = req.body.url;

  var newPost = {
    "text" : comment,
    "upvotes" : 0,
    "downvotes" : 0

  };

  data["comments"].push(newPost);

  res.redirect(url);
 }
