const Connection = require('./Connection')
const { Role } = require('../models/Relations')

// Sync database
Connection.sync({force: true}).then(
    () => {
        console.log('Drop and Resync DB')
        initialRoles()
    }
).catch(error => {
    console.log(error.message, error)
})

// Create initial roles
const initialRoles = () => {
    Role.bulkCreate([
        {
            id: 1,
            name: 'user' 
        },
        {
            id: 2,
            name: 'moderator'
        },
        {
            id: 3,
            name: 'admin'
        }
    ])
}