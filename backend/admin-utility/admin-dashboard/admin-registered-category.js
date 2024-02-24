const Category = require('../../models/Category');

// Admin View Registered Category
module.exports.adminViewRegisteredCategory = async (req, res) => {
    try {
        const admin = req.adminData;

        const user = await Category.find();

        res.render('admin-view-registered-category', {
            name: admin.name,
            email: admin.email,
            user: user
        });
    } catch (err) {
        res.redirect('admin-dashboard');
    }
}

// Get New Category Page
module.exports.addNewCategory = (req, res) => {
    const admin = req.adminData;

    res.render("add-new-category", {
        name: admin.name,
        email: admin.email,
    });
}

// Post New/Add Category
module.exports.postAddNewCategory = async (req, res) => {
    const admin = req.adminData;
    try {
        const newCategory = new Category({
            category_name: req.body.categoryName,
        });

        const data = await newCategory.save();

        res.redirect('admin-dashboard');

    } catch (err) {
        res.render("add-new-category", {
            name: admin.name,
            email: admin.email,
        });
    }
}