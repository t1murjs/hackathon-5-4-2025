const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

mongoose.connect(process.env.MONGOOSE_CONNECTION_URI)