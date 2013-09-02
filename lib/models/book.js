module.exports = function(app) {
  var ObjectId = require('mongodb').ObjectID;
  
  var Model = { name: 'BookModel' },
      collection = app.db.collection('books');
  
  Model.list = function(query, callback) {
    try {
      collection.find(query).toArray(function(error, books) {
        if(error) {
          console.log(Model.name + ' #list error when performing find ' + error.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null, books);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #list exception when performing find ' + exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.create = function(bookToAdd, callback) {
    try {
      collection.insert(bookToAdd, {safe: true}, function(error, books) {
        if(error) {
          console.log(Model.name + ' #create error when inserting '+ bookToAdd.toString() + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else if(!books[0]) {
          console.log(Model.name + ' #create no books were created for '+ bookToAdd.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #create exception when inserting '+ bookToAdd + ' - '+ exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.read = function(isbn, callback) {
    try {
      collection.findOne({isbn: isbn}, function(error, book) {
        if(error) {
          console.log(Model.name + ' #read error when finding book '+ isbn + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else if(book === null){
          console.log(Model.name + ' #read could not find book '+ isbn);
          callback(app.config.errors.resource_not_found);
        } else {
          callback(null, book);
        } 
      });
    } catch(exception) {
      console.log(Model.name + ' #read exception when finding book '+ isbn +' - ' + exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.update = function(isbn, book, callback) {
    try {
      collection.update({isbn: isbn}, book, {safe: true, multi: false}, function(error) {
        if(error) {
          console.log(Model.name + ' #update error when updating book '+ isbn + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #update exception when performing update ' + exception);
      callback(app.config.errors.database_error);
    }
  };
  
  Model.remove = function(isbn, callback) {
    try {
      collection.remove({isbn: isbn}, function(error) {
        if(error) {
          console.log(Model.name + ' #remove error when removing '+ isbn + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #remove exception when removing '+ isbn + ' - '+ exception);
      callback(app.config.errors.database_error);
    }
  };
  
  return Model;
}