const express = require('express')
const {loadEnvFile} = require('process')
loadEnvFile('../.env')

const app = express()

app.listen((process.env.NODE_SERVER_PORT), () => {
    console.log('server is listening on port:', process.env.NODE_SERVER_PORT)
})