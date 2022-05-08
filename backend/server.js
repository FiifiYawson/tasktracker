const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')

const app = express()

app.use(cors())

const db = process.env.NODE_ENV === 'production' ? process.env.MONGO_ATLAS_URI : process.env.MONGO_LOCAL_URI

mongoose.connect(`${db}`).then().catch((err) => {
    console.log(err)
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/tasks', require('./routes/taskRoutes'))
app.use('/users', require('./routes/userRoutes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build/')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
}

app.listen(5000)