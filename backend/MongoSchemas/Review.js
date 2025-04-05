const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    Reviewer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ReviewedCourse: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    Review:{
        type: String, //maximum length is 180 words
        required: true
    }
})

const ReviewModel = mongoose.model('Review', UserSchema)

module.exports = {ReviewModel}