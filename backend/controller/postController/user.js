const User = require('../../models/User');

// bcrypt - Hashing
const bcrypt = require('bcryptjs');

// Register User
module.exports.register = async (req, res) => {
    try {
        if (req.cookies.user) {  // User already logged in but want to access, adminLogin page 
            res.redirect('user-dashboard');
        } else {
            // Getting Data from Form
            const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                studentID: req.body.studentID,
                mobile: req.body.mobile,
                address: req.body.address
            })

            // JWT Token
            const token = await data.generateAuthToken();

            // Cookie
            res.cookie("user", token, {
                expires: new Date(Date.now() + 800000)
            })

            // Saving to DB
            const userData = await data.save();

            res.render('user-dashboard', {
                name: userData.name,
                email: userData.email
            })
        }
    } catch (err) {
        res.status(400).redirect('register');;
    }
}

// User Login
module.exports.userLogin = async (req, res) => {
    try {
        if (req.cookies.admin) {  // Admin already logged in but want to access, userLogin page 
            res.redirect('user-dashboard');
        } else {
            const email = req.body.email;
            const password = req.body.password;

            const user = await User.findOne({ email: email });
            const isPassword = await bcrypt.compare(password, user.password);

            if (isPassword) {

                // JWT Token
                const token = await user.generateAuthToken();

                // Cookie
                res.cookie('user', token, {
                    expires: new Date(Date.now() + 300000)
                });

                res.render('user-dashboard', {
                    name: user.name,
                    email: user.email
                });
            } else {
                throw Error("Invalid Credentials");
            }
        }
    } catch (err) {
        res.status(400).redirect('userLogin');
    }
}

// User Secret Pages
module.exports.userAuth = ((req, res) => {
    const data = req.userData;  // Accessing data from previous middleware
    res.render('user-dashboard', {
        name: data.name,
        email: data.email
    })
});

// Logout  
module.exports.userLogout = ((req, res) => {
    res.cookie("user", 'token', { maxAge: 1 });
    res.redirect('/');
});
