const mongoose = require('mongoose');

/**
 * option schema containing
 * 1. text value of option
 * 2. number of votes to this option
 * 3. link to give vote
 * 4. question id of that option
 */

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    link_to_vote: {
        type: String
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, { timestamps: true });

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;