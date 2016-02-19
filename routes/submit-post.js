var data = require("./placeholders/posts.json");

exports.post = function(req, res) { 
  var image = req.query.image;
  var comment = req.query.comment;
  var category = req.query.category;

  console.log(image + ' ' + comment + ' ' + category);

  var newPost = {
    "title" : comment,
    "img-src" : "http://lorempixel.com/500/500/",
    "category" : category,
    "category-short" : category,
    "upvotes" : 0,
    "downvotes" : 0,
    "comments": []
  };

  data.push(newPost);

  res.redirect('/');
 }
