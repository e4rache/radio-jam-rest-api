const jwt = require('jsonwebtoken')
const config = require('../../config.js')

module.exports = (req, res, next) => {
    try {
        const JWT_KEY = config.main.JWT_KEY
        //console.log('JWT_KEY', JWT_KEY)
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'athentication failed',
            error: error
        })
    }
}
