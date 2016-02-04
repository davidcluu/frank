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
      foo: function () { return 'FOO!'; }
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

/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
