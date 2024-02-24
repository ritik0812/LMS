const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
    },
    author_name: {
        type: String
    },
    category_name: {
        type: String
    },
    book_number: {
        type: String
    },
    book_price: {
        type: String
    }
})


const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;