const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

// JWT Expires or Not present than Logout
const adminAuth = async (req, res, next) => {
    try {
        if (req.cookies.user) {  // User already logged in but want to access, adminLogin page 
            res.redirect('user-dashboard');
        } else {
            const token = req.cookies.admin;

            const verifyToken = jwt.verify(token, "hellomynameisnitinvermaiamamerndeveloper");

            // User verification from DB
            const admin = await Admin.findOne({ _id: verifyToken._id });

            if (admin) {
                req.adminData = admin;   // Storing data so that we can access/pass it further
                next();
            } else {
                res.redirect('adminLogin');
            }
        }
    } catch (err) {
        res.render('adminLogin');
    }
}

module.exports = adminAuth;  