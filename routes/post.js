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
    .find({'_id' : id})
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

        res.render(pageToRender, info);
      }
    });
}

exports.post = function(req, res) { 
  var comment = req.body.comment;

  var url_base = req.body.base;
  var url_category = req.body.category;
  var url_id = req.body.id;
  var url_title = req.body.title;

  var url = '/' + url_base + '/' + url_category + '/' + url_id + '/' + url_title;

  models.Post
    .find({
      '_id': url_id
    })
    .populate('comments')
    .exec(afterQuery);

  function afterQuery(err, post) {
    var currPost = post[0];

    var newComment = new models.Comment({
      "text" : comment,
      "upvotes" : 0,
      "downvotes" : 0
    });
    newComment.save(function(err, com) {
      if(err) console.log(err);

      currPost.comments.push(com['_id']);

      currPost.save(function(err) {
        if(err) console.log(err);
      })
    });
  }

  res.redirect(url);
 }
