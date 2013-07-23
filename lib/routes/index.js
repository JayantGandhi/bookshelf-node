
/*
 * GET home page.
 */
module.exports = function(app) {
	var BookController = app.controllers.BookController;

	app.get('/', function(req, res) {
		res.redirect('/books');
	});

	/* Books */
	app.get('/books', BookController.list);
	app.get('/book/:id', BookController.show);
	app.get('/books/new', BookController.new);
	app.post('/books', BookController.create);
	// app.get('/books/edit', BookController.edit);
	// app.put('/books', BookController.update);
	// app.delete('/books', BookController.delete);
}