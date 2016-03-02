/**
 * Load dependencies
 */
var mongoose = require('mongoose');
var models   = require('../models');

/**
 * Connect to the database
 */
var local_database_name = 'frank_app';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


/**
 * Do initialization
 */
initialize();

function initialize() {
  // Boolean Flags
  var userSaved = false;
  var categoriesSaved = false;

  function canClose() {
    return (userSaved && categoriesSaved);
  }

  // User
  models.User
    .find()
    .remove()
    .exec(addUsers);

  function addUsers(err) {
    if(err) console.log(err);

    var json = require('./user1.json');
    var user = new models.User(json);
    user.save(function(err, user) {
      if(err) console.log(err);

      console.log('Saved User ' + user.username);
      userSaved = true;

      if (canClose()) {
        mongoose.connection.close();
      }
    });
  }

  // Category
  var categories = require('./categories.json');

  models.Category
    .find()
    .remove()
    .exec(addCategories);

  function addCategories(err) {
    if(err) console.log(err);

    var count = categories.length;
    for (var i = 0; i < categories.length; ++i) {
      var json = categories[i];
      var category = new models.Category(json);

      category.save(function(err, cat) {
        if(err) console.log(err);

        console.log('Saved Category ' + cat.category);

        --count;
        if(count <= 0) {
          console.log('Done saving categories');
          categoriesSaved = true;
        }

        if (canClose()) {
          mongoose.connection.close();
        }
      });
    }
  }
}
