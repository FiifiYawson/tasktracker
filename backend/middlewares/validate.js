const jwt = require('jsonwebtoken')

function validate(req, res, next) {
    const valid = jwt.verify(req.headers.authorization, process.env.SECRET)

    req.authorization = valid

    next()
}

module.exports = validate