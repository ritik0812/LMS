// User
const User = require('../models/User');

const bcrypt = require('bcryptjs');

// Update Profile
module.exports.updatePassword = async (req, res) => {
    const user = req.userData;

    res.render('user-change-password', {
        name: user.name,
        email: user.email
    });
}

module.exports.changePassword = async (req, res) => {
    try {
        const user = req.userData;

        const data = await User.findOne({ _id: user._id });

        const isMatched = await bcrypt.compare(req.body.oldPassword, data.password);

        if (isMatched) {
            const newPassword = await bcrypt.hash(req.body.newPassword, 10);
            const userPassword = await User.findByIdAndUpdate({ _id: data._id }, { $set: { password: newPassword } }, { value: true });

            res.cookie("user", 'token', { maxAge: 1 });

            res.redirect('userLogin');
        } else {
            throw Error("Invalid Old Password");
        }
    } catch (err) {
        res.redirect('user-change-password');
    }
}