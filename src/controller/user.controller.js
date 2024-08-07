const { db } = require("../models");
const { Op } = require('sequelize');

exports.getUsers = async (req, res, _) => {
EmployeeAttendance.findAll({
  attributes: [
    'EmployeeID',
    [sequelize.fn('MONTH', sequelize.col('Date')), 'Month'],
    [sequelize.fn('COUNT', sequelize.col('*')), 'Absences']
  ],
  where: {
    Status: 'Absent'
  },
  group: ['EmployeeID', sequelize.fn('MONTH', sequelize.col('Date'))],
  having: sequelize.where(
    sequelize.fn('COUNT', sequelize.col('*')),
    {
      [Op.gt]: 5
    }
  )
})

    Transactions.findAll({
  attributes: [
    [sequelize.fn('MONTH', sequelize.col('TransactionDate')), 'Month'],
    [sequelize.fn('SUM', sequelize.col('Amount')), 'TotalAmount']
  ],
  group: [sequelize.fn('MONTH', sequelize.col('TransactionDate'))]
})
//     StudentGrades.findAll({
//   attributes: [
//     'StudentID',
//     [sequelize.fn('COUNT', sequelize.col('CourseID')), 'CourseCount']
//   ],
//   where: {
//     Grade: 'A'
//   },
//   group: ['StudentID'],
//   having: sequelize.where(
//     sequelize.fn('COUNT', sequelize.col('CourseID')),
//     {
//       [Op.gt]: 3
//     }
//   )
// })
//     db.SalesData.findAll({
//   attributes: [
//     'ProductID',
//     'RegionID',
//     [db.sequelize.fn('SUM', db.sequelize.col('SaleAmount')), 'TotalSales']
//   ],
//   group: ['ProductID', 'RegionID']
// })
//    const data = await db.EmployeeDetails.findAll({
//   where: db.sequelize.where(db.sequelize.fn('MOD', db.sequelize.col('EmpId'), 2), {
//     [Op.ne]: 0
//   })
//    })
    // const data = await db.EmployeeDetails.findAll({
    //     attributes: ['Name', 'Salary'],
    //     include: [{
    //         model: db.EmployeeDetails,
    //         as: 'Manager',
    //         attributes: ['Name', 'Salary'],
    //         where: {
    //             '$EmployeeDetails.Salary$': {
    //                 [Op.gt]: db.sequelize.col('Manager.Salary')
    //             }
    //         }
    //     }],
    // });
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
