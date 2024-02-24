const mongoose = require('mongoose');

// bcrypt -: Hash Password
const bcrypt = require('bcryptjs');

// jwt - Generating Tokens
const jwt = require('jsonwebtoken');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    studentID: {
        type: String
    },
    mobile: {
        type: Number
    },
    address: {
        type: String
    }
})


// Hashing Password
userSchema.pre('save', async function (next) {

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
userSchema.methods.generateAuthToken = async function (req, res) {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.User_Secret_Key_JWT_Token);
        return token;
    } catch (err) {
        res.send(err);
    }
}



// User Model
const User = new mongoose.model("User", userSchema);

module.exports = User;