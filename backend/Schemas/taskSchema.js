const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    discription: String,

    completed: {
        type: Boolean
    },

    user: mongoose.SchemaTypes.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('tasks', taskSchema)