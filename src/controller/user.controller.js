const { db } = require("../models");


exports.getUsers = async (req, res, _) => {
    const user = await db.user.findAll({});
    if (user.length > 0) {
        return res.status(200).json({ message: "data fetched", status: 200, user: user })
        
    } else {
         return res.status(200).json({ message: "data fetched", status: 200, user: [] })
    }
    
}

exports.getUserById = async (req, res, _) => {
    const user = await db.user.findOne({ where: { id: req.body.id } });
    if (user) {
        return res.status(200).json({ message: "data fetched", status: 200, user: user })
        
    } else {
        return res.status(200).json({ message: "data fetched", status: 200, user: [] })
    }
}   
