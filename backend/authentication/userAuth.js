const jwt = require('jsonwebtoken');

const User = require('../models/User');

// JWT Expires or Not present than Logout
const userAuth = async (req, res, next) => {

    try {
        if (req.cookies.admin) {   // Admin already logged in but want to access, userLogin page 
            res.redirect('admin-dashboard');
        } else {
            const token = req.cookies.user;

            const verifyToken = jwt.verify(token, "jwtnewkeygeneratedbymrnitinvermathemsjrjsuejduejekejs");

            // User verification from DB
            const user = await User.findOne({ _id: verifyToken._id });

            if (user) {
                req.userData = user;   // Storing data so that we can access/pass it further
                next();
            } else {
                res.redirect('userLogin');
            }
        }
    } catch (err) {
        res.render('userLogin');
    }
}



module.exports = userAuth;
