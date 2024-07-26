const { sign, verify, decode } = require('jsonwebtoken');

const signToken = async (id,role) => {
    const token  = sign({ id,role }, 'jwtSecret', {
    expiresIn: '1m',
    issuer:'nodejs'
    })
    return token;
}


const verifyToken =  async (token) => {
    const decoded = await verify(token, 'jwtSecret');
    return decoded
}

module.exports = {
    signToken,verifyToken
}