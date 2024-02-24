module.exports.viewProfile = (req, res) => {
    const user = req.userData;

    res.render('user-view-profile', {
        name: user.name,
        email: user.email,
        studentID: user.studentID,
        mobile: user.mobile,
        address: user.address
    });
} 