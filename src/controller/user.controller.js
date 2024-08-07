const { db } = require("../models");
const { Op } = require('sequelize');

exports.getUsers = async (req, res, _) => {
    const data = await db.EmployeeDetails.findAll({
        attributes: ['Name', 'Salary'],
        include: [{
            model: db.EmployeeDetails,
            as: 'Manager',
            attributes: ['Name', 'Salary'],
            where: {
                '$EmployeeDetails.Salary$': {
                    [Op.gt]: db.sequelize.col('Manager.Salary')
                }
            }
        }],
    });
    console.log(data[1].dataValues)
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
