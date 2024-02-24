const IssuedBooks = require('../models/IssueBook');

module.exports.getUserViewIssuedBooks = async (req, res) => {

    const user = req.userData;

    try {
        const data = await IssuedBooks.find({ student_id: user.studentID });

        res.render('view-issued-books', {
            name: user.name,
            email: user.email,
            data: data
        });
    } catch (err) {
        console.log("err" + err);
        res.render('view-issued-books', {
            name: user.name,
            email: user.email
        });
    }
}