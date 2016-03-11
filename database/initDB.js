/**
 * Load dependencies
 */
var mongoose = require('mongoose');
var fs = require('fs');
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
  var user1Saved = false;
  var user2Saved = false;
  var userJohnSaved = false;
  var userAnonSaved = false;
  var categoriesSaved = false;
  var postsSaved = false;

  function canClose() {
    return (user1Saved && user2Saved && userJohnSaved && userAnonSaved && categoriesSaved && postsSaved);
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

  // User
  models.User
    .find()
    .remove()
    .exec(addUsers);

  function addUsers(err) {
    if(err) console.log(err);

    var json1 = require('./user1.json');
    var user1 = new models.User(json1);
    user1.save(function(err, user) {
      if(err) console.log(err);

      console.log('Saved User ' + user.username);
      user1Saved = true;

      if (canClose()) {
        mongoose.connection.close();
      }
    });

    var json2 = require('./user2.json');
    var user2 = new models.User(json2);
    user2.save(function(err, user) {
      if(err) console.log(err);

      console.log('Saved User ' + user.username);
      user2Saved = true;

      if (canClose()) {
        mongoose.connection.close();
      }
    });

    var jsonJohn = require('./userJohn.json');
    var userJohn = new models.User(jsonJohn);
    userJohn.save(function(err, user) {
      if(err) console.log(err);

      console.log('Saved User ' + user.username);
      userJohnSaved = true;

      if (canClose()) {
        mongoose.connection.close();
      }
    });

    var jsonAnon = require('./userAnon.json');
    var userAnon = new models.User(jsonAnon);
    userAnon.save(function(err, user) {
      if(err) console.log(err);

      console.log('Saved User ' + user.username);
      userAnonSaved = true;

      if (canClose()) {
        mongoose.connection.close();
      }
    });
  }


  // Posts
  var posts = require('./posts.json');

  models.Comment
    .find()
    .remove()
    .exec(function(err) {
      if(err) console.log(err);

      models.Post
        .find()
        .remove()
        .exec(addPosts);
    });

  function addPosts(err) {
    if(err) console.log(err);

    var count = posts.length;
    for (var i = 0; i < posts.length; ++i) {
      getRefsAndSave(i);

      function getRefsAndSave(i) {
        var json = {};

        json.title = posts[i].title;
        json.img_src = posts[i]['img-src'];
        json.upvotes = posts[i].upvotes;
        json.downvotes = posts[i].downvotes;

        models.User
          .find({'username': 'test2'})
          .exec(function(err, user) {
            posts_AfterUser(err, user, i, json);
          });
      }

      function posts_AfterUser(err, user, i, json) {
        if(err) console.log(err);

        json.user = user[0]['_id'];

        models.Category
          .find({'short': posts[i]['category-short']})
          .exec(function(err, cat) {
            if(err) console.log(err);

            posts_AfterCategory(err, cat, i, json);
          });
      }

      function posts_AfterCategory(err, cat, i, json) {
        if(err) console.log(err);

        json.category = cat[0]['_id'];

        json.comments = [];

        var count = posts[i].comments.length;
        for (var j = 0; j < posts[i].comments.length; ++j) {
          var comment_json = posts[i].comments[j];
          var comment = new models.Comment(comment_json);

          comment.save(function(err, com) {
            if(err) console.log(err);

            json.comments.push(com['_id']);

            --count;
            if(count <= 0) {
              console.log('Done saving comments for post ' + json.title);

              savePost(json);
            }
          });
        }
      }

      function savePost(json) {
        var post = new models.Post(json);

        post.save(function (err, pos) {
          if(err) console.log(err);

          console.log('Saved Post ' + pos.title);

          --count;
          if(count <= 0) {
            console.log('Done saving posts');
            postsSaved = true;
          }

          if (canClose()) {
            mongoose.connection.close();
          }
        });
      }
    }
  }
}
