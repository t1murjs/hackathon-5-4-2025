const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code:{
        type: String, 
        required: true
    },
    rating: {
        type: Number,
        default: 1,
        minimum: 1,
        maximum: 5
    },
    instructor:{ // Student, Instructor, Admin
        type: String, 
        required: true,
        ref: 'User'
    },
    reviews:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Review'
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