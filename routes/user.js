const Route = require('express').Router()
const authJwt = require('../middlewares/authJwt')
const userController = require('../controllers/User')

Route.get(
    "/all", 
    userController.all
);

Route.get(
    "/user",
    [authJwt.verifyToken],
    userController.user
);

Route.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderator
);

Route.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.admin
);

module.exports = Route