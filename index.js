/**
 * Dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

/**
 * Routes
 */
var index = require('./routes/index');

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
 * Routes
 */
app.get('/', index.view);

/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
