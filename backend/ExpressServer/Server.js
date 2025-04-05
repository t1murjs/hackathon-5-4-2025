const express = require('express')
const cors = require('cors')
const session = require('express-session')

const {loadEnvFile} = require('process')
loadEnvFile('../.env')

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))

app.use(session({
    cookie:{
        maxAge: 60*60*24*7,
        httpOnly: true
    },
    saveUninitialized: false,
    path: '/',
    secret: process.env.SESSION_SECRET
}))
app.listen((process.env.NODE_SERVER_PORT), () => {
    console.log('server is listening on port:', process.env.NODE_SERVER_PORT)
})