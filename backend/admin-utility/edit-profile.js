// Admin
const Admin = require('../models/Admin');

// Edit Profile
module.exports.editProfile = (req, res) => {
    try {
        const admin = req.adminData;

        res.render('edit-profile', {
            name: admin.name,
            email: admin.email,
            mobile: admin.mobile,
        })

    } catch (err) {
        res.status(400).redirect('admin-edit-profile');
    }
}

// Update Profile
module.exports.updateProfile = async (req, res) => {
    try {
        const admin = req.adminData;

        const data = await Admin.findByIdAndUpdate({ _id: admin._id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
            }
        }, {
            new: true
        });

        // After Update Redirect To Admin Login Page
        res.cookie("admin", 'token', { maxAge: 1 });
        res.redirect('/');
    } catch (err) {
        res.status(400).redirect('admin-edit-profile');
    }
}