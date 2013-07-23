module.exports = function(app) {
	var ObjectId = require('mongodb').ObjectID;

	var Model = {name: 'BookModel'},
		collection = app.db.collection('books');

	Model.list = function(query, callback) {
		try{
			collection.find(query).toArray(function(error, books) {
				if (error) {
					console.log(Model.name + ' #list error when performing find ' + error.toString());
					callback(app.config.errors.database_error);
				} else {
					callback(null, books);
				}
			});
		} catch (exception) {
			console.log(Model.name + ' #list exception when performing find ' + exception);
			callback(app.config.errors.database_error);
		}
	};

	Model.read = function(isbn, callback) {
		try{
			collection.findOne({isbn: isbn}, function(error, book) {
				if (error) {
					console.log(Model.name + ' #read error when finding book ' + isbn + ' - ' + error.toString());
					callback(app.config.errors.database_error);
				} else if (book === null) {
					console.log(Model.name + ' #read could not find book' + isbn);
					callback(app.config.errors.resource_not_found);
				} else {
					callback(null, book)
				}
			});
		} catch(exception) {
			console.log(Model.name + ' #read exception when finding book ' + isbn + '-' + exception);
			callback(app.config.errors.database_error);
		}
	}

	Model.create = function (bookToAdd, callback) {
		try {
			collection.insert(bookToAdd, {saf: true}, function(error, books){
				if(error) {
					console.log(Model.name + ' #create error when inserting ' + bookToAdd.toString() + ' - ' + error.toString());
					callback(app.config.errors.database_error);
				} else if(!books[0]) {
					console.log(Model.name + ' #create no books were created for ' + bookToAdd.toString());
				} else {
					callback(null, books[0]);
				}
			});
		} catch (exception) {
			// console.log(Model.name + ' #create exception when inserting ' + bookToAdd + '-'  exception);
			callback(app.config.errors.database_error);
		}
	};

	Model.remove = function (isbn, callback) {
		collection.remove({isbn: isbn}, {safe: true}, function(error){
			if(error) {
				callback(app.config.errors.database_error);
			} else {
				callback(null);
			}
		});
	};

	return Model;
}