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
        required: true
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {UserModel}