
/**
 * Module dependencies.
 */

var express = require('express')

  , http = require('http')
  , path = require('path')
  , init=require('./init.js')
  ,routeMap=require('./routeMap.js');
var app = express();



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if ('production' == app.get('env')) {
  app.use(express.errorHandler());
}

routeMap(app);


http.createServer(app).listen(app.get('port'), function(){
	init();  //init something
  console.log('Express server listening on port ' + app.get('port'));
});
