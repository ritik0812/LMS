// Mongoose
const mongoose = require('mongoose');

// Depricated Warning's
mongoose.set('strictQuery', false)

// DB
const DB = process.env.DB;

const data = async () => {
    try {
        const connection = await mongoose.connect(DB);
        console.log("Connection Successfull");
    } catch (err) {
        console.log("Error in db connection -:" + err);
    }
}

// Calling 
data();