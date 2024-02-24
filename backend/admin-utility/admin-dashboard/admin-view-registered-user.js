const User = require('../../models/User');

module.exports.adminViewRegisteredUser = async (req, res) => {

    try {
        const admin = req.adminData;

        const user = await User.find();

        res.render('admin-view-registered-user', {
            name: admin.name,
            email: admin.email,
            user: user
        });
    } catch (err) {
        res.redirect('admin-dashboard');
    }
}