/*
 * GET Home Page
 */
var models = require('../models');

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

    models.Post
      .find()
      .populate('user')
      .populate('category')
      .populate('comments')
      .sort('-upvotes')
      .exec(function(err, post) {
        var info = {
          'categories' : categories,
          'posts' : post
        }

        res.render(pageToRender, info);
      });
  }
}
