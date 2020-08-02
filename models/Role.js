const { DataTypes } = require('sequelize')
const Connection = require('../db/Connection')

const Role = Connection.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
})

module.exports = Role