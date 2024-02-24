const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    author_name: {
        type: String,
    }
})


const Author = new mongoose.model('Author', authorSchema);

module.exports = Author;