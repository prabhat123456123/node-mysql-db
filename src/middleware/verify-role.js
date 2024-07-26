
const restrictTo = (...roles) => (req, res, next) => {
    const {role} = req.user.dataValues;
    console.log(req.user.dataValues,req.user);
    if (!roles.includes(role)) {
        throw new Error("you are not authorized!....")
        return
    }
    return next();
}

module.exports = {restrictTo}