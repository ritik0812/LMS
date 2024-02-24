// Admin already Logged In

const Books = require('../../models/Books');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const User = require('../../models/User');
const IssueBook = require('../../models/IssueBook');



module.exports.getAdminLogin = async (req, res) => {       // Admin Login Page

    const admin = req.adminData;

    // Count Author, Books, Category & User
    const books = await Books.find().count();
    const category = await Category.find().count();
    const author = await Author.find().count();
    const user = await User.find().count();
    const issueBook = await IssueBook.find().count();

    res.render('admin-dashboard', {
        name: admin.name,
        email: admin.email,
        books: books,
        category: category,
        author: author,
        user: user,
        issueBook: issueBook
    });
}   