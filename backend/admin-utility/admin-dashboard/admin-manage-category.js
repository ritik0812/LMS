const Category = require('../../models/Category');


module.exports.getAdminManageCategory = async (req, res) => {
    const admin = req.adminData;
    try {
        const category = await Category.find();

        res.render('manage-category', {
            name: admin.name,
            email: admin.email,
            category: category
        });
    } catch (err) {
        res.render('manage-category', {
            name: admin.name,
            email: admin.email
        });
    }
}



// Get Edit Category Req
var editCategoryId = "";   // Get Category Id

module.exports.getAdminEditCategory = async (req, res) => {
    const admin = req.adminData;
    try {

        editCategoryId = req.query.categoryID;   // Get Category Id From URL ?Categoryid="..."
        const data = await Category.findOne({ _id: editCategoryId });
        res.render('edit-category', {
            name: admin.name,
            email: admin.email,
            category_id: data._id,
            category_name: data.category_name,
        })

    } catch (err) {
        res.render('manage-category');
    }
}

// Post Edit Category Req
module.exports.postAdminEditCategory = async (req, res) => {
    const admin = req.adminData;

    try {
        const data = await Category.findByIdAndUpdate(
            { _id: editCategoryId },
            {
                $set: {
                    category_name: req.body.category_name,
                }
            },
            { value: true }
        );

        res.redirect('manage-category');
    } catch (err) {
        res.render('edit-category', {
            name: admin.name,
            email: admin.email,
            category_id: req.body.category_id,
            category_name: req.body.category_name
        });
    }
}

// Delete Category
module.exports.getAdminDeleteCategory = async (req, res) => {
    const deleteCategoryId = req.query.categoryID;

    try {
        const data = await Category.findByIdAndDelete(
            { _id: deleteCategoryId }, { value: true }
        );

        res.redirect('manage-category');
    } catch (err) {
        res.redirect('manage-category');
    }


}