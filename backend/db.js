const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mybook";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoo successfully")
    })
}

module.exports = connectToMongo