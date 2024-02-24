const mongoose = require('mongoose');

// bcrypt -: Hash Password
const bcrypt = require('bcryptjs');

// jwt - Generating Tokens
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: String
    }
})


// Hashing Password
adminSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    } catch (err) {
        console.log(err);
    }
    next();
})


// Generating Tokens
adminSchema.methods.generateAuthToken = async function (req, res) {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.Admin_Secret_Key_JWT_Token);
        return token;
    } catch (err) {
        res.send(err);
    }
}


const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;