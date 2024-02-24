const Book = require('../../models/Books');
const Author = require('../../models/Author');
const IssueBook = require('../../models/IssueBook');


// Get Issue Book Page Req
module.exports.issueBook = async (req, res) => {
    const admin = req.adminData;
    var currDate = new Date();
    var year = currDate.getFullYear();
    if (year < 10) {
        year = "0" + year;
    }

    var month = currDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    var date = currDate.getDate();
    if (date < 10) {
        date = "0" + date;
    }

    const author = await Author.find();

    res.render("issue-book", {
        name: admin.name,
        email: admin.email,
        date: date,
        month: month,
        year: year,
        author: author
    });
}


// Post Issue Book Req
module.exports.postIssueBook = async (req, res) => {
    const admin = req.adminData;
    const author = await Author.find();
    var currDate = new Date();
    var year = currDate.getFullYear();
    if (year < 10) {
        year = "0" + year;
    }

    var month = currDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    var date = currDate.getDate();
    if (date < 10) {
        date = "0" + date;
    }


    try {
        var bookName = req.body.issueBookName;
        var authorName = req.body.selectBookAuthor;

        const issueBook = new IssueBook({
            book_name: bookName,
            book_author: authorName,
            book_number: req.body.bookNumber,
            student_id: req.body.studentID,
            issue_date: req.body.issueDate
        })

        const issueBookData = await issueBook.save();

        res.redirect('admin-dashboard');


    } catch (err) {
        res.render("issue-book", {
            name: admin.name,
            email: admin.email,
            date: date,
            month: month,
            year: year,
            author: author
        });
    }
}


module.exports.adminViewIssuedBook = async (req, res) => {
    const admin = req.adminData;
    try {

        const data = await IssueBook.find();
        res.render('admin-view-issued-book', {
            name: admin.name,
            email: admin.email,
            data: data
        });
    } catch (err) {
        res.redirect('admin-dashboard', {
            name: admin.name,
            email: admin.email,
        });
    }
}

/*
        // Already present in DB then add it's ID only
        const bookdata = await Book.findOne({ book_name: bookName });
        const authorData = await Author.findOne({ author_name: authorName });
        
        
       
        if (bookdata) {
            bookName = bookdata._id;
            if ((authorData._id).toString() == bookdata.author_name) {
                authorName = (authorData._id).toString();

                const issueBook = new IssueBook({
                    book_name: bookName,
                    book_author: authorName,
                    book_number: req.body.bookNumber,
                    student_id: req.body.studentID,
                    issue_date: req.body.issueDate
                })

                const issueBookData = await issueBook.save();

                res.redirect('admin-dashboard');

            } else {
                res.render("issue-book", {
                    name: admin.name,
                    email: admin.email,
                    author: author,
                    date: date,
                    month: month,
                    year: year
                });
            }
        } else {
            res.render("issue-book", {
                name: admin.name,
                email: admin.email,
                date: date,
                month: month,
                year: year,
                author: author
            });
        }
*/

