const Author = require('../../models/Author');

module.exports.getAdminManageAuthor = async (req, res) => {
    const admin = req.adminData;
    try {
        const author = await Author.find();

        res.render('manage-author', {
            name: admin.name,
            email: admin.email,
            author: author
        });
    } catch (err) {
        res.render('manage-author', {
            name: admin.name,
            email: admin.email
        });
    }
}


// Get Edit Author
var editAuthorId = "";   // Get Aurthor Id

module.exports.getAdminEditAuthor = async (req, res) => {
    const admin = req.adminData;
    try {
        editAuthorId = req.query.authorID;   // Get Author Id From URL ?authorID="..."

        const data = await Author.findOne({ _id: editAuthorId });
        res.render('edit-author', {
            name: admin.name,
            email: admin.email,
            author_id: data._id,
            author_name: data.author_name
        })
    } catch (err) {
        res.render('manage-author');
    }
}

// Get Edit Author
module.exports.postAdminEditAuthor = async (req, res) => {
    const admin = req.adminData;

    try {
        const data = await Author.findByIdAndUpdate(
            { _id: editAuthorId },
            {
                $set: {
                    author_name: req.body.author_name,
                }
            },
            { value: true }
        );

        res.redirect('manage-author');
    } catch (err) {
        res.render('edit-author', {
            name: admin.name,
            email: admin.email,
            author_id: req.body.author_id,
            author_name: req.body.author_name
        });
    }
}

// Delete Author
module.exports.getAdminDeleteAuthor = async (req, res) => {
    const deleteAuthorId = req.query.authorID;
    try {
        const data = await Author.findByIdAndDelete(
            { _id: deleteAuthorId }, { value: true }
        );
        res.redirect('manage-author');
    } catch (err) {
        res.redirect('manage-author');
    }
}

