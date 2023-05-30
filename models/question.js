const mongoose = require('mongoose');


/**
 * Question schema to hold title and options of perticular question
 */

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]

}, { timestamps: true });


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;