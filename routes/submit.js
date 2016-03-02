/*
 * GET Post Page
 */
var models = require('../models');

// Render the page
exports.view = function(req, res) {
  renderPage(res, 'submit');
};

exports.viewb = function(req, res) {
  renderPage(res, 'submitbdesign');
};

function renderPage(res, pageToRender) {
  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

    var info = {
      'categories' : categories
    }

    res.render(pageToRender, info);
  }
}
