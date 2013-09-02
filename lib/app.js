
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
app.config = require(path.join(__dirname, '../config'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// database connection
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(app.config.database.uri, function (error, db) {
  if(error) {
    console.log("Error connecting to database: " + error.toString().replace("Error: ",""));
  } else {
    console.log("Connected to DB " + app.config.database.uri);
    
    app.db = db;
    app.models = {
      BookModel : require('./models/book')(app)
    };
    app.controllers = {
      BookController : require('./controllers/book')(app)
    };

    require('./routes')(app);

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });

  }
});