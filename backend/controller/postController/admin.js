const Admin = require('../../models/Admin');
const Books = require('../../models/Books');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const User = require('../../models/User');
const IssueBook = require('../../models/IssueBook');

const bcrypt = require('bcryptjs');

// Registering Admin Details
const createAdmin = async (req, res) => {
    try {
        const name = "Admin";
        const email = "admin@admin.com";
        const password = "12345";
        const mobile = "1234567890";

        const data = new Admin({
            name: name,
            email: email,
            password: password,
            mobile: mobile
        });

        // const ans = await data.save();
    } catch (err) {
        console.log(err);
    }
}

createAdmin();


// Admin Login
module.exports.adminLogin = async (req, res) => {
    // Count Author, Books, Category & User
    const books = await Books.find().count();
    const category = await Category.find().count();
    const author = await Author.find().count();
    const user = await User.find().count();
    const issueBook = await IssueBook.find().count();

    try {
        if (req.cookies.user) {  // User already logged in but want to access, admin-dashboard page 
            res.redirect('user-dashboard');
        } else {
            const email = req.body.email;
            const password = req.body.password;

            const admin = await Admin.findOne({ email: email });

            const isPassword = await bcrypt.compare(password, admin.password);
            if (isPassword) {

                // JWT Token 
                const token = await admin.generateAuthToken();

                // Cookie
                res.cookie('admin', token, {
                    expires: new Date(Date.now() + 300000)
                });

                res.render('admin-dashboard', {
                    name: admin.name,
                    email: admin.email,
                    books: books,
                    category: category,
                    author: author,
                    user: user,
                    issueBook: issueBook
                });
            } else {
                throw Error("Invalid Credentials");
            }
        }
    } catch (err) {
        res.status(400).redirect('adminLogin');;
    }
}


// Admin Secret Page
module.exports.adminAuth = (async (req, res) => {
    // Count Author, Books, Category & User
    const books = await Books.find().count();
    const category = await Category.find().count();
    const author = await Author.find().count();
    const user = await User.find().count();
    const issueBook = await IssueBook.find().count();

    const data = req.adminData;  // Accessing data from previous middleware
    res.render('admin-dashboard', {
        name: data.name,
        email: data.email,
        books: books,
        category: category,
        author: author,
        user: user,
        issueBook: issueBook
    });
});


// Admin Logout
module.exports.adminLogout = ((req, res) => {
    res.cookie("admin", 'token', { maxAge: 1 });
    res.redirect('/');
});
