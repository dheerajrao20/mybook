const mongoose = require('mongoose');
const mongoURI = "localhost:27017";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoo successfully")
    })
}

module.exports = connectToMongo