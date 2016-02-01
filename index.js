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
var post = require('./routes/post');
var category = require('./routes/category');

/**
 * App
 */
var app = express();

/**
 * Environments
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route handlers
 */
app.get('/', index.view);
app.get('/post', post.view);
app.get('/pages/:category', category.view);

/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
