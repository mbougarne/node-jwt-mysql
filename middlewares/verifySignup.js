const { roles } = require('../config/db')
const User = require('../models/User')

checkIfUsernameOrEmailExists = (req, res, next) => 
{
    User.findOne(
        {
            where: {
                username: req.body.username
            }
        }
    ).then(
        user => {
            if(user) 
            {
                return res.status(412).json({
                    success: false,
                    message: 'Failed! Username is already taken!'
                })
            }
        }
    )

    User.findOne(
        {
            where: {
                email: req.body.email
            }
        }
    ).then(
        user => {
            if(user)
            {
                return res.status(412).json({
                    success: false,
                    message: 'Failed! Email is already taken!'
                })
            }
        }
    )

    next()
}

checkIfRoleIsExists = (req, res, next) => 
{
    let reqRoles = req.body.roles

    if(!reqRoles)
    {
        return res.status(422).json({
            success: false,
            message: "Error! The roles are required"
        })
    }

    for(let i = 0; i < reqRoles.length; i++)
    {
        if(!roles.includes(reqRoles[i]))
        {
            return res.status(412).json({
                success: false,
                message: "Error! The role " + reqRoles[i] + " is not valide!"
            })
        }
    }

    next()
}

module.exports = {
    checkIfUsernameOrEmailExists,
    checkIfRoleIsExists
}