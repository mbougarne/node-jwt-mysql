const Route = require('express').Router()
const verifySignup = require('../middlewares/verifySignup')
const { signup, signin} = require('../controllers/Login')

Route.post(
    '/signup', 
    [
        verifySignup.checkIfUsernameOrEmailExists,
        verifySignup.checkIfRoleIsExists
    ],
    signup
)

Route.post('/signin', signin)

module.exports = Route