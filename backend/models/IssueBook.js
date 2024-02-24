const mongoose = require('mongoose');

const issueBookSchema = new mongoose.Schema({
    book_name: {
        type: String,
    },
    book_author: {
        type: String
    },
    book_number: {
        type: String
    },
    student_id: {
        type: String
    },
    issue_date: {
        type: String
    }
})

const IssueBook = new mongoose.model("IssueBook", issueBookSchema);

module.exports = IssueBook;