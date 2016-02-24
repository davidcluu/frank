/*
 * GET Post Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('post', info);
};

var categories = require('./placeholders/categories.json');

// Post to render
var sample_post = require('./placeholders/post1.json');


var info = {
  'categories' : categories,
  'post' : sample_post
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