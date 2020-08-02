const User = require('./User')
const Role = require('./Role')

Role.belongsToMany(User, {
    through: "user_role",
    foreignKey: "role_id",
    otherKey: "user_id"
})

User.belongsToMany(Role, {
    through: 'user_role',
    foreignKey: 'user_id',
    otherKey: 'role_id'
})

module.exports = {
    Role,
    User
}