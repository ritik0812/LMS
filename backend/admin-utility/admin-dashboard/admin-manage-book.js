const Book = require('../../models/Books');
const Author = require('../../models/Author');
const Category = require('../../models/Category');


module.exports.getAdminManageBook = async (req, res) => {
    const admin = req.adminData;
    try {
        const books = await Book.find();

        res.render('manage-book', {
            name: admin.name,
            email: admin.email,
            books: books
        });
    } catch (err) {
        res.render('manage-book', {
            name: admin.name,
            email: admin.email
        });
    }
}


// Get Edit Book
var editBookId = "";   // Get Book Id

module.exports.getAdminEditBook = async (req, res) => {
    const admin = req.adminData;
    try {

        editBookId = req.query.booksId;   // Get Book Id From URL ?booksid="..."
        const data = await Book.findOne({ _id: editBookId });

        res.render('edit-book', {
            name: admin.name,
            email: admin.email,
            book_name: data.book_name,
            author_name: data.author_name,
            category_name: data.category_name,
            book_number: data.book_number,
            book_price: data.book_price
        })


    } catch (err) {
        console.log("Error" + err);
        res.render('manage-book');
    }
}

// Get Edit Book
module.exports.postAdminEditBook = async (req, res) => {
    const admin = req.adminData;

    try {
        const data = await Book.findByIdAndUpdate(
            { _id: editBookId },
            {
                $set: {
                    book_name: req.body.book_name,
                    author_name: req.body.author_name,
                    category_name: req.body.category_name,
                    book_number: req.body.book_number,
                    book_price: req.body.book_price
                }
            },
            { value: true }
        );

        res.redirect('manage-book');
    } catch (err) {
        console.log("Error" + err);
        res.render('edit-book', {
            name: admin.name,
            email: admin.email,
            book_name: req.body.book_name,
            author_name: req.body.author_name,
            category_name: req.body.category_name,
            book_number: req.body.book_number,
            book_price: req.body.book_price
        });
    }
}

// Delete Book
module.exports.getAdminDeleteBook = async (req, res) => {
    const deleteBookId = req.query.booksId;

    try {
        const data = await Book.findByIdAndDelete(
            { _id: deleteBookId }, { value: true }
        );

        res.redirect('manage-book');
    } catch (err) {
        console.log("Error" + err);
        res.redirect('manage-book');
    }


}