const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{ // Student, Instructor, Admin
        type: String, 
        enum: ["Student", "Instructor"],
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userRatings: {
        type: [mongoose.Types.ObjectId],
        ref: 'Course'
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {UserModel}