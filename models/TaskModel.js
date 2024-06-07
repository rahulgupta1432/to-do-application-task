// const { Sequelize, DataTypes, Model } = require('sequelize');
const {seuqelizeCon,DataTypes,Model} = require('../config/dbConfig');
const {User} = require('./UserModel');

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    modelName: 'Task',
    tableName: 'tasks',
    sequelize: seuqelizeCon,
    timestamps: true
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
