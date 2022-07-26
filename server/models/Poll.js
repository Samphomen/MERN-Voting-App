const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const PollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Poll', PollSchema)