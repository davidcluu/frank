/*
 * GET Profile Page
 */

var categories = require('./placeholders/categories.json');
var posts = require('./placeholders/posts.json');

var user = require('./placeholders/user.json');

// Render the page
exports.view = function(req, res) {
  var username = user['username'];

  var userPosts = [];
  for (var i = 0; i < posts.length; i++) {
  	var newPost = posts[i];
  	console.log(posts[i].username);
  	if (posts[i].username == username) {
  		userPosts.push(newPost);
  	}
  }

  if (userPosts < 1) {
  	var noPosts = "No Posts to display. Try submitting one!";
  }

  console.log(userPosts);

  res.render('profile', {
	  'username' : username,
	  'categories' : categories,
	  'category' : categories[0],
	  'posts' : userPosts,
	  'noPosts' : noPosts

  });
};
 