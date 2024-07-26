
module.exports =  (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull:false
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull:true
            },
             email: {
                type: DataTypes.STRING(20),
                allowNull:true
            },
              password: {
                type: DataTypes.STRING(200),
                allowNull:true
            },
                role: {
                type: DataTypes.ENUM('USER','ADMIN'),
                defaultValue:'USER'
            }
        }, {
            sequelize,
            tableName: 'user',
            timeStamps: false,
            createdAt: false,
               updatedAt: 'updateTimestamp',
        }
    );
}