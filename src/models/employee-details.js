
module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        "EmployeeDetails",
        {
            EmpId: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull:false
            },
            Name: {
                type: DataTypes.STRING(100),
                allowNull:true
            },
             Salary: {
                type: DataTypes.FLOAT,
                allowNull:true
            },
              ManagerId: {
                type: DataTypes.INTEGER,
                allowNull:true
            },
            
        }, {
            sequelize,
            tableName: 'EmployeeDetails',
            timeStamps: false,
            createdAt: false,
               updatedAt: false,
        }
    );
}