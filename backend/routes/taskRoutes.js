const express = require('express')
const { getTasks, createTask, updateTask, deleteTask, deleteTasks } = require('../Controllers/taskControllers.js')
const validate = require('../middlewares/validate.js')

const router = express.Router()

router.route('/:id').put(validate, updateTask).delete(validate, deleteTask)

router.route('/').post(validate, createTask).get(validate, getTasks).delete(validate, deleteTasks)

module.exports = router