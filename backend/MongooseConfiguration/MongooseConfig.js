const mongoose = require('mongoose')
const {loadEnvFile} = require('process')
loadEnvFile('../.env')

const connectToMongoDatabase = async () => 
{
    try{
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log('Successfully connected to the database')
    }
    catch(err)
    {
        console.log('There was an error connecting to the db', err)
    }
   
}

module.exports = { connectToMongoDatabase }