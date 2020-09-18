const mongoose = require('mongoose');

const dbConfig = process.env.MONGODB_URI || 'mongodb://localhost/workout';


async function connectDB() {
    await mongoose.connect(dbConfig, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, () =>
        console.log("Connected to DB")
    );
}


module.exports = connectDB;