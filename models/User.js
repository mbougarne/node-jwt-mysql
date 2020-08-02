const { DataTypes } = require('sequelize')
const Connection = require('../db/Connection')

const User = Connection.define('User', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

module.exports = User