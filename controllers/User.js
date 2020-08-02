module.exports = {
    all: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Public Content'
        })
    },
    user: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'User Content'
        })
    },
    admin: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Admin Content'
        })
    },
    moderator: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Moderator Content'
        })
    }
}