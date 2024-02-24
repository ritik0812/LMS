const jwt = require('jsonwebtoken');

const Admin = require('../../models/Admin');

const User = require('../../models/User');
const Books = require('../../models/Books');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const IssueBook = require('../../models/IssueBook');



module.exports.getHome = async (req, res) => {                             // Home Page
    try {

        // Count Author, Books, Category & User
        const books = await Books.find().count();
        const category = await Category.find().count();
        const author = await Author.find().count();
        const user = await User.find().count();
        const issueBook = await IssueBook.find().count();

        if (req.cookies.admin) {
            const adminToken = req.cookies.admin;
            const adminVerifyToken = jwt.verify(adminToken, "hellomynameisnitinvermaiamamerndeveloper");
            const admin = await Admin.findOne({ _id: adminVerifyToken._id })
            if (admin) {
                res.render("admin-dashboard", {
                    name: admin.name,
                    email: admin.email,
                    books: books,
                    category: category,
                    author: author,
                    user: user,
                    issueBook: issueBook
                });
            } else {
                res.redirect('/');
            }
        } else if (req.cookies.user) {
            const userToken = req.cookies.user;
            const userVerifyToken = jwt.verify(userToken, "jwtnewkeygeneratedbymrnitinvermathemsjrjsuejduejekejs");
            const user = await User.findOne({ _id: userVerifyToken._id });
            if (user) {
                res.redirect("user-dashboard");
            } else {
                res.redirect('/');
            }
        } else {
            res.render('home');
        }
    } catch (err) {
        res.render('home');
    }
}

// Already Logged 
module.exports.getRegister = async (req, res) => {      // Register Page
    try {
        const token = req.cookies.user;

        const verifyToken = jwt.verify(token, "jwtnewkeygeneratedbymrnitinvermathemsjrjsuejduejekejs");

        // User verification from DB
        const user = await User.findOne({ _id: verifyToken._id });

        if (user) {
            res.redirect('user-dashboard');
        } else {
            res.redirect('register');
        }
    } catch (err) {
        res.render('register');
    };
}


// User already Logged In
module.exports.getUserLogin = async (req, res) => {    // Login Page
    res.redirect('user-dashboard');
}
