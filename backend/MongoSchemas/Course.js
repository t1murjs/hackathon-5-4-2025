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
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {UserModel}