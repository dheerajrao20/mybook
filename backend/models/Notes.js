const mongoose = require('mongoose');

const NotesSchema = new Schema({

    title:{
        type: String,
        required : true,
    },
    discription:{
        type: String,
        required : true,
    },
    tags:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);