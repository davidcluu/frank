/*
 * GET Post Page
 */
var models = require('../models');

// Post to render
var sample_post = require('./placeholders/post1.json');

// Render the page
exports.view = function(req, res) {
  renderPage(res, 'post');
};

exports.viewb = function(req, res) {
  renderPage(res, 'postbdesign');
};

function renderPage(res, pageToRender) {
  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

    var info = {
      'categories' : categories,
      'post' : sample_post
    }

    res.render(pageToRender, info);
  }
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
