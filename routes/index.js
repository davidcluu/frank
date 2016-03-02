/*
 * GET Home Page
 */
var models = require('../models');

var posts = require('./placeholders/posts.json');
var user = require('./placeholders/user.json');

// Render the page
exports.view = function(req, res) {
  if ( isEmptyObject(user) ) {
    res.redirect('/login');
  }
  else {
    renderPage(res, 'index');
  }
};

exports.viewb = function(req, res) {
  if ( isEmptyObject(user) ) {
    res.redirect('/loginb');
  }
  else {
    renderPage(res, 'indexbdesign');
  }
};

function isEmptyObject(obj) {
  return Object.keys(obj).length == 0;
}

function renderPage(res, pageToRender) {
  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

    var info = {
      'categories' : categories,
      'posts' : posts
    }

    res.render(pageToRender, info);
  }
}
