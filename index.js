/**
 * Load dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var multer = require('multer');
var mongoose = require('mongoose');


/**
 * Load route handler modules
 */
var index = require('./routes/index');
var submit = require('./routes/submit');
var category = require('./routes/category');
var post = require('./routes/post');
var login = require('./routes/login');
var bdesign = require('./routes/bdesign');
var profile = require('./routes/profile');


/**
 * Database
 */
var local_database_name = 'frank_app';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri

var MongoDB = mongoose.connect(database_uri).connection;


/**
 * App
 */
var app = express();


/*
 * Handlebars instance
 */
var hbs = handlebars.create ({
  // Instance level helpers
  helpers: {
    // Capitalizes the first letter of every space-delimited word
    // ex. "hello world" -> "Hello World"
    capitalizeAll: function (str) {
      var pieces = str.split(" ");
      for (var i = 0; i < pieces.length; i++) {
        pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
      }
      return pieces.join(" ");
    },
    // Truncates the last full word that fits within len characters, appends ellipsis to the end
    truncate: function (str, len) {
      if (str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return (new_str + " ...");
      }
      return str;
    },
    truncateURL: function (str, len) {
      if (str.length > len && str.length > 0) {
        return str.substr(0, len).toLowerCase().replace(/ /g, "_");
      }
      return str.toLowerCase().replace(/ /g, "_");
    }
  }
});


/**
 * Environments
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());


/**
 * Route handlers
 */
app.get('/', index.view);
app.get('/submit', submit.view);
app.get('/pages/:category', category.view);
app.get('/pages/:category/:hash/:title_cut', post.view);
app.get('/login', login.view);
app.get('/profile', profile.view);

/**
 * B-Design Route handlers
 */
 var isB = false;
app.get('/b', function(req, res) {
  isB = true;
  index.viewb(req, res);
});
app.get('/bdesign', bdesign.view);
app.get('/submitb', submit.viewb);
app.get('/pagesb/:category', category.viewb);
app.get('/pagesb/:category/:hash/:title_cut', post.viewb);
app.get('/loginb', login.viewb);
app.get('/profileb', profile.viewb);


/**
 * Other Route handlers
 */
app.get('/post-login', login.login);

/**
 * POST handlers
 */
app.post('/submit-post', multer().any(), function(req, res) { 
  var user = require("./routes/placeholders/user.json");
  var data = require("./routes/placeholders/posts.json");

  var comment = req.body.comment;
  var category = req.body.category;

  var newPost = {
    "title" : comment,
    "img-src" : "http://lorempixel.com/500/500/people/",
    "username" : user.username,
    "category" : category,
    "category-short" : shortenCategory(category),
    "upvotes" : 0,
    "downvotes" : 0,
    "comments": []
  };

  data.push(newPost);

  if (isB) {
    res.redirect('/b');
  }
  else {
    res.redirect('/');
  }
 });
app.post('/post-comment', post.post);


/**
 * Route handler helper functions
 */
function shortenCategory (category) {
  switch (category) {
    case "Clothing": return "clothing";
    case "Shoes": return "shoes";
    case "Accessories": return "accessories";
    case "Makeup": return "makeup";
    case "Hairstyles": return "hairstyles";
    case "Facial Hair": return "facialhair";
    default: console.log("Error: Incorrect Category");
  }
}


/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
