module.exports.viewProfile = (req, res) => {
    const admin = req.adminData;

    res.render('view-profile', {
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile
    });
}