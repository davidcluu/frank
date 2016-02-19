var data = require("./placeholders/post1.json");

exports.post = function(req, res) { 
  var comment = req.query.comment;
  var url = req.query.url;

  var newPost = {
    "text" : comment,
    "upvotes" : 0,
    "downvotes" : 0

  };

  console.log(comment);

  data["comments"].push(newPost);

  res.redirect(url);

 }
