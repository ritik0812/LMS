const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
    }
})


const Category = new mongoose.model('Category', categorySchema);

module.exports = Category;