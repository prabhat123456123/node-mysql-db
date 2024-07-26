const jwtServices = require('../services/jwt.services')
const {db} = require('../models')
const validateToken = async (req, res, next) => {
    let token;

    const {authorization} = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(" ")[1];

    } else if (req.cookie?.token) {
          token = req.cookie?.token
    }
    if (!token) {
        return res.status(401).json({ message: "You are not logged in" });
    }

    const decoded = jwtServices.verifyToken(token);
    const currentUser = await db.user.findOne({ where: { id: decoded.id } });
    if (!currentUser) {
      return res.status(401).json({ message: "User does not exist with this token" });
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
}

module.exports = {validateToken}
