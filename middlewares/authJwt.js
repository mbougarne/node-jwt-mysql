const jwt = require('jsonwebtoken')
const { User } = require('../models/Relations')

const SECRET_KEY = process.env.JWT_SECRET_KEY

verifyToken = (req, res, next) =>
{
    let token = req.headers['x-access-token']

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided!'
        })
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {

        if(err)
        {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized!'
            })
        }

        req.userId = decoded.id

        next()
    })

}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                if(!roles.includes('admin'))
                {
                    return res.status(403).json({
                        success: false,
                        message: 'You are not authorized!'
                    })
                }

                next()
            })
        })
}

isModerator = (req, res, next) => {
    
    User.findByPk(req.userId)
        .then(user => {
            
            user.getRoles().then(roles => {

                if(!roles.includes('moderator'))
                {
                    return res.status(403).json({
                        success: false,
                        message: 'You are not authorized!'
                    })
                }
                next()
            })
        })
}

isAdminOrModerator = (req, res, next) => {

    User.findByPk(req.userId)

        .then(user => {

            user.getRoles().then(roles => {

                if(!roles.includes('admin') || !roles.includes('moderator'))
                {
                    return res.status(403).json({
                        success: false,
                        message: 'You are not authorized!'
                    })
                }

                next()
            })
        })
}

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isAdminOrModerator
}