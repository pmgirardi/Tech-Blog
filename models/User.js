const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Checks that password entered by user matches password in database
    checkPassword(userPw) {
        return bcrypt.compareSync(userPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
    
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },
    {
        hooks: {
// beforeCreate works with data before a new instance is created 
            async beforeCreate(newUserData) {
// User's password is hashed and then added to database
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
// beforeUpdate works with data before it is updated
            async beforeUpdate(updatedUserData) {
// User's password is hashed before it is updated in database
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
// Link to database connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;
