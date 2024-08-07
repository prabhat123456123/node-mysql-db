const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

let db = {};
db.sequelize = sequelize;
db.user = require('./user')(sequelize, DataTypes);
db.EmployeeDetails = require('./employee-details')(sequelize, DataTypes);

// Define the association
db.EmployeeDetails.belongsTo(db.EmployeeDetails, {
  as: 'Manager', // Alias for the manager
  foreignKey: 'ManagerId'
});

db.EmployeeDetails.hasMany(db.EmployeeDetails, {
  as: 'employees', // Alias for the subordinates
  foreignKey: 'ManagerId'
});
module.exports = {db}