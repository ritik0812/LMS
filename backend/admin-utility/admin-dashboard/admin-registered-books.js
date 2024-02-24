const Author = require('../../models/Author');
const Category = require('../../models/Category');
const Book = require('../../models/Books');


// Viewing Registered Books Req
module.exports.adminViewRegisteredBooks = async (req, res) => {
    try {
        const admin = req.adminData;

        const user = await Book.find();

        res.render('admin-view-registered-books', {
            name: admin.name,
            email: admin.email,
            user: user
        });
    } catch (err) {
        res.redirect('admin-dashboard');
    }
}


// Get New Book Page Req
module.exports.addNewBook = (req, res) => {
    const admin = req.adminData;

    res.render("add-new-book", {
        name: admin.name,
        email: admin.email,
    });
}

// Post Add/New Book Req
module.exports.postAddNewBook = async (req, res) => {
    const admin = req.adminData;
    try {

        var authorName = req.body.bookAuthor;
        var categoryName = req.body.bookCategory;

        /*
        // Already present in DB then add it's ID only
        const authorData = await Author.findOne({ author_name: authorName });
        const categoryData = await Category.findOne({ category_name: categoryName });

        if (authorData) {
            authorName = (authorData._id).toString();
        }

        if (categoryData) {
            categoryName = (categoryData._id).toString();
        }
        */

        const book = new Book({
            book_name: req.body.bookName,
            author_name: authorName,
            category_name: categoryName,
            book_number: req.body.bookNumber,
            book_price: req.body.bookPrice
        })

        const bookData = await book.save();

        res.redirect('admin-dashboard');
    } catch (err) {
        res.render("add-new-book", {
            name: admin.name,
            email: admin.email,
        });
    }
}
