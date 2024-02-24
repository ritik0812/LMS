// User
const User = require('../models/User');

// Edit Profile
module.exports.editProfile = (req, res) => {
    try {
        const user = req.userData;

        res.render('user-edit-profile', {
            name: user.name,
            email: user.email,
            studentID: user.studentID,
            mobile: user.mobile,
            address: user.address
        })

    } catch (err) {
        res.status(400).redirect('edit-profile');
    }
}

// Update Profile
module.exports.updateProfile = async (req, res) => {
    try {
        const user = req.userData;

        const data = await User.findByIdAndUpdate({ _id: user._id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                studentID: req.studentID,
                mobile: req.body.mobile,
                address: req.body.address
            }
        }, {
            new: true
        });

        // After Update Redirect To User Login Page
        res.cookie("user", 'token', { maxAge: 1 });
        res.redirect('/');
    } catch (err) {
        res.status(400).redirect('user-edit-profile');
    }
}