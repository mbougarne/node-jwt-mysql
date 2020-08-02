const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User, Role} = require('../models/Relations')

const SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = (req, res) => 
{
    let {username, email, password} = req.body

    User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8)
    }).then(user => {
        if(req.body.roles)
        {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    return res.status(201).json({
                        success: true,
                        message: "Account created successfully!"
                    })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                return res.status(201).json({
                    success: true,
                    message: "Account created successfully!"
                })
            })
        }
    }).catch(error => {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    })
}

const signin = (req, res) => {
    
    let username = validateEmail(req.body.username) ? 'email' : 'username'

    User.findOne({
        where: {
            [username]: req.body.username
        }
    }).then(user => {

        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if(!passwordIsValid)
        {
            return res.status(401).json({
                success: false,
                accessToken: null,
                message: 'Password is invalide!'
            })
        }

        let token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: 3600})

        let authorities = []

        user.getRoles().then(roles => {

            for(let i = 0; i < roles.length; i++)
            {
                authorities.push('ROLE_' + roles[i].name.toUpperCase())
            }

            return res.status(200).json({
                success: true,
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                message: 'Welcome!'
            })

        }).catch(error => {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        })

    })
}

const validateEmail = username => {
    let email = String(username).trim()

    let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return rgx.test(email.toLowerCase());
}

module.exports = {
    signup,
    signin
}