const express = require('express')
const cors = require('cors')

require('dotenv').config()

// Routes
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

let app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )

    next()
})

app.use('/api/auth', authRoutes)
app.use('/api/test', userRoutes)

// Show 404 other routes
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        succuss: false,
        path: req.path,
        URI: req.url,
        message: 'Requested resource not found!'
    })
})

module.exports = app