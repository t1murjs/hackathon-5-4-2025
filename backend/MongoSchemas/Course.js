const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code:{
        type: String, 
        required: true
    },
    upvotes: {
        type: [mongoose.Types.ObjectId]
    },
    reviews:{
        type: [mongoose.Types.ObjectId],
        ref: 'Review'
    },
    credits: {
        type: Number,
        default: 1,
        min: 1,
        max: 30
    },
    teachingMode:{
        type: String,
        enum: ['Online', 'Flipped', 'In-person'],
        required: true,
        default: 'Online'
    }
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = {CourseModel}