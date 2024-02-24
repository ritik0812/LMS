const User = require('../../models/User');
const Author = require('../../models/Author');

module.exports.adminViewRegisteredAuthor = async (req, res) => {

    try {
        const admin = req.adminData;

        const user = await Author.find();

        res.render('admin-view-registered-author', {
            name: admin.name,
            email: admin.email,
            user: user
        });
    } catch (err) {
        res.redirect('admin-dashboard');
    }
}

// Get New Author Page
module.exports.addNewAuthor = (req, res) => {
    const admin = req.adminData;

    res.render("add-new-author", {
        name: admin.name,
        email: admin.email,
    });
}

// Post New/Add Auther
module.exports.postAddNewAuthor = async (req, res) => {
    const admin = req.adminData;
    try {

        const newAuthor = new Author({
            author_name: req.body.authorName,
        });

        const data = await newAuthor.save();

        res.redirect('admin-dashboard');

    } catch (err) {
        res.render("add-new-author", {
            name: admin.name,
            email: admin.email,
        });
    }
}