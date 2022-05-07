const express = require('express')
const { registerUser, deleteUser, loginUser } = require('../Controllers/userControllers.js')
const validate = require('../middlewares/validate.js')

const router = express.Router()

router.route('/delete').delete(validate, deleteUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router