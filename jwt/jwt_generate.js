const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET = process.env.SECRET
function generateAccessToken(userid){
    return jwt.sign(userid, SECRET, {expiresIn: '36000s'})
}

module.exports = {
    generateAccessToken
}