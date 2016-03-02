/*
 * GET bdesign Page
 */
var models = require('../models');

// Render the page
exports.view = function(req, res) {
  models.Category
    .find()
    .sort('_id')
    .exec(afterQuery);

  function afterQuery(err, categories) {
    if(err) console.log(err);

    var info = {
      'categories' : categories
    }

    res.render('bdesign', info);
  }
};
