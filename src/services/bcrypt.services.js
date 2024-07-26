const { hash, compare } = require('bcryptjs');


const hashPassword = async (password) => {
    const pass = await hash(password, 10);
    return pass;
}

const comparePassword = async (enteredPassword,originalPassword) => {
    const isMatch = await compare(enteredPassword,originalPassword);
    return isMatch;
}

module.exports = {comparePassword,hashPassword}