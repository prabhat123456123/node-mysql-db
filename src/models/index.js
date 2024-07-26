const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

let db = {};
db.sequelize = sequelize;
db.user = require('./user')(sequelize, DataTypes);

module.exports = {db}