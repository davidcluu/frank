/**
 * Load dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

/**
 * Load route handler modules
 */
var index = require('./routes/index');
var submit = require('./routes/submit');
var category = require('./routes/category');
var post = require('./routes/post');
var popular = require('./routes/popular');
var login = require('./routes/login');

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

/**
 * Route handlers
 */
app.get('/', index.view);
app.get('/submit', submit.view);
app.get('/pages/:category', category.view);
app.get('/pages/:category/:hash/:title_cut', post.view);
app.get('/popular', popular.view);
app.get('/login', login.view);

/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
