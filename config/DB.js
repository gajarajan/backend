const mongoose = require('mongoose');
const config = require("config");
//const db = config.get("mongoURI");
const DB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/firstproject", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.set('useFindAndModify', false);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err.message);
        console.log("hi");

        process.exit(1);
    }

};

module.exports = DB;