// Admin
const Admin = require('../models/Admin');

const bcrypt = require('bcryptjs');

// Update Profile
module.exports.updatePassword = async (req, res) => {
    const admin = req.adminData;

    res.render('change-password', {
        name: admin.name,
        email: admin.email
    });
}

module.exports.changePassword = async (req, res) => {
    try {
        const admin = req.adminData;

        const data = await Admin.findOne({ _id: admin._id });

        const isMatched = await bcrypt.compare(req.body.oldPassword, data.password);

        if (isMatched) {
            const newPassword = await bcrypt.hash(req.body.newPassword, 10);
            const adminPassword = await Admin.findByIdAndUpdate({ _id: data._id }, { $set: { password: newPassword } }, { value: true });

            res.cookie("admin", 'token', { maxAge: 1 });

            res.redirect('adminLogin');
        } else {
            throw Error("Invalid Old Password");
        }
    } catch (err) {
        res.redirect('change-password');
    }
}