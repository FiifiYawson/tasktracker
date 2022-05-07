const users = require('../Schemas/userSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { tasks } = require('./taskControllers.js')

async function deleteUser(req, res) {
    try {
        await users.findByIdAndRemove(req.authorization.user._id)
        await tasks.deleteMany({ user: req.authorization.user._id })

        const isExist = await users.exists({ _id: req.authorization.user._id })
        const taskIsExist = await tasks.exists({ user: req.authorization.user._id })

        if (isExist && taskIsExist) {
            res.json({
                "message": "user not deleted",
                "isSuccess": false,
            })
        } else {
            res.json({
                "message": "user deleted successfully",
                "isSuccess": true,
            })
        }
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: 'serve error',
        })
    }

}

async function registerUser(req, res) {
    try {
        const userExistsId = await users.exists({ name: req.body.name })

        if (userExistsId) {
            res.json({
                "message": "user already exists",
                "user data": req.body,
                "isSuccess": false,
            })
        } else {
            const salt = await bcrypt.genSalt()

            req.body.createdAt = Date()
            req.body.password = await bcrypt.hash(req.body.password, salt)

            await users.create(req.body)

            const userExistsId = await users.exists({ name: req.body.name })

            const userTask = await tasks.find({ user: userExistsId })
            const user = await users.findById(userExistsId)
            const auth = jwt.sign({ user }, process.env.SECRET)

            res.json({
                "message": "user created successfully",
                "user data": req.body,
                "auth": auth,
                "isSuccess": true,
                tasks: userTask,
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'server error',
            isSuccess: false,
        })
    }
}

async function loginUser(req, res) {
    try {
        const userExists = await users.exists({ name: req.body.name })

        if (userExists) {
            const user = await users.findOne(userExists)
            const valid = await bcrypt.compare(req.body.password, user.password)
            const userTask = await tasks.find({ user: user })

            if (valid) {
                auth = jwt.sign({ user }, process.env.SECRET)

                res.json({
                    "message": "user logged in successfully",
                    "user data": req.body,
                    "auth": auth,
                    "isSuccess": true,
                    tasks: userTask,
                })
            } else {
                res.json({
                    "message": "incorrect password",
                    "user data": req.body,
                    "isSuccess": false,
                    islogged: false,
                })
            }
        } else {
            res.json({
                "message": "user not found",
                "user data": req.body,
                "isSuccess": false,
                islogged: false,
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
    deleteUser,
    registerUser,
    loginUser,
}