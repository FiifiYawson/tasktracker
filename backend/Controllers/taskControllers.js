const tasks = require('../Schemas/taskSchema.js')
const bcrypt = require('bcrypt')

async function createTask(req, res) {
    req.body.user = req.authorization.user._id

    try {
        await tasks.create(req.body)

        const isExist = await tasks.exists({ name: req.body.name })

        const userTasks = await tasks.find({ user: req.authorization.user._id })
        if (isExist) {
            res.json({
                "message": "task created successfully",
                "isSuccess": true,
                tasks: userTasks,
            })
        } else {
            res.json({
                "message": "task failed to create",
                "isSuccess": false,
                tasks: userTasks,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error',
            isSuccess: false,
        })
    }
}

async function getTasks(req, res) {
    try {
        const isExist = await tasks.exists({ user: req.authorization.user._id })

        const userTask = await tasks.find({ user: req.authorization.user._id })
        if (isExist) {

            res.json({
                message: "request seccessful",
                tasks: userTask,
                isSuccess: true,
            })
        } else {
            res.json({
                "message": "request successful but user has no tasks",
                tasks: userTask,
                isSuccess: true,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'serve error',
            isSuccess: false,
        })
    }
}

async function deleteTask(req, res) {
    try {
        const task = await tasks.findById(req.params.id)

        if (task.user == req.authorization.user._id) {
            await tasks.findByIdAndRemove(req.params.id)
            res.json({
                "message": "task deleted successfully",
                isSeccess: true,
            })
        } else {
            res.json({
                "message": "unauthorized delete",
                isSeccess: false,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error',
            isSuccess: false,
        })
    }
}

async function updateTask(req, res) {
    try {
        const task = await tasks.findById(req.params.id)

        if (task.user == req.authorization.user._id) {
            await tasks.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.json({
                "message": "updated successfully",
                isSeccess: true,
            })
        } else {
            res.json({
                "message": "unauthorized update",
                isSeccess: false,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error',
            isSuccess: false,
        })
    }
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    tasks,
}