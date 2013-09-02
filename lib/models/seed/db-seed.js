var path = require('path'),
    config = require(path.join(__dirname, '../../../config')),
    _ = require('underscore');
    
var booksToAdd = [];

booksToAdd.push({
  title: 'Eloquent Javascript',
  author: 'Marijn Haverbeke',
  description: 'Eloquent JavaScript is a book providing an introduction to the JavaScript programming language and programming in general.',
  isbn: '1593272820'
});

booksToAdd.push({
  title: 'JavaScript: The Good Parts',
  author: 'Douglas Crockford',
  description: 'Covers the bits of Javascript that are worth using, and how to use them, as well as the bits that should be avoided.',
  isbn: '0596517742'
});

booksToAdd.push({
  title: 'JavaScript: The Good Parts 2',
  author: 'Douglas Crockford',
  description: 'Covers the bits of Javascript that are worth using, and how to use them, as well as the bits that should be avoided.',
  isbn: '0596805527'
});

booksToAdd.push({
  title: 'JavaScript: The Good Parts 2',
  author: 'Douglas Crockford',
  description: 'Covers the bits of Javascript that are worth using, and how to use them, as well as the bits that should be avoided.',
  isbn: '1449399029'
});

// booksToAdd.push({
//   title: 'Async JavaScript: Build More Responsive Apps with Less Code',
//   author: 'Trevor Burnham',
//   description: 'With the advent of HTML5, front-end MVC, and Node.js, JavaScript is ubiquitous—and still messy. This book will give you a solid foundation for managing async tasks without losing your sanity in a tangle of callbacks. It’s a fast-paced guide to the most essential techniques for dealing with async behavior, including PubSub, evented models, and Promises. With these tricks up your sleeve, you’ll be better prepared to manage the complexity of large web apps and deliver responsive code.',
//   tags: 'javascript',
//   isbn: '9781937785277'
// });
// 
// booksToAdd.push({
//   title: 'CoffeeScript: Accelerated JavaScript Development',
//   author: 'Trevor Burnham',
//   description: 'CoffeeScript is JavaScript done right. It provides all of JavaScript’s functionality wrapped in a cleaner, more succinct syntax. In the first book on this exciting new language, CoffeeScript guru Trevor Burnham shows you how to hold onto all the power and flexibility of JavaScript while writing clearer, cleaner, and safer code.',
//   category: 'javascript',
//   IBSN: '9781934356784'
// });

booksToAdd.push({
  title: 'Agile Testing with Ruby and Rails',
  author: 'Joe O\'Brien',
  isbn: '1590599152'
});

booksToAdd.push({
  title: 'CSS: The Definitive Guide',
  author: 'Eric Meyer',
  isbn: '0596527330'
});

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.database.uri, function(err, db) {
  if(err) {
    console.log("Error connecting to database: " + err.toString().replace("Error: ",""));
    
  } else {
    console.log("Connected to DB " + config.database.uri);
    
    db.collection('books').insert(booksToAdd, function(error, books) {
      if(error) {
        console.log('Error seeding database with books');
      } else {
        console.log(books.length+' new books added to database: ' + _.pluck(books, 'title').join(', '));
      }
      db.close();
    });
  }
});


