const { db } = require("../models");
const { bcryptServices:{hashPassword,comparePassword},jwtServices:{signToken} } = require("../services");


exports.signupHandler = async (req, res, _) => {
    console.log("kokokoko")
    const { name, email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
    return res.status(409).json({message:"user already registered", status:409})
    }
    const hPass = await hashPassword(password)
    await db.user.create({
        name: name,
        email: email,
        password:hPass
    })
return res.send({message:"user registered", status:201})
    
}

exports.loginHandler = async (req, res, _) => {
    
    const { email, password } = req.body;
 const user = await db.user.findOne({ where: { email: email } });

    if (user) {
        const isMatch = await comparePassword(password, user.password)
        if (isMatch) {
            let token = await signToken(user.id, user.role);
            return res.send({message:"user logged in", status:200,token:token})
        } else {
             return res.status(400).json({message:"invalid credential", status:400})
        }
    } else {
         return res.status(400).json({message:"user not registered", status:400})
}

    
}