const mongoose = require("mongoose")

const connectDB = async () => {
    
    try{
        await mongoose.connect("mongodb://localhost:27017/")
        console.log("Database connected !!");
    }
    catch(err){
        console.log(err.name);
        process.exit(1);            // else server will keep running
    }

}

module.exports = connectDB;