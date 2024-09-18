const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User')

const Task = sequelize.define( 'Task' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Khóa ngoại tới bảng users
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tasks',
    timestamps:false
})

//Mối quan hệ giữa hai bảng
Task.belongsTo(User, { foreignKey: 'user_id' }); // Một công việc thuộc về một người dùng
User.hasMany(Task, { foreignKey: 'user_id' });   // Một người dùng có thể có nhiều công việc

module.exports = Task;