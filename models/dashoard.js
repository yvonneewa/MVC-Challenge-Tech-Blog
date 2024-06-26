
const { DataTypes } = require('sequelize');
const Comment = require('./comment'); 

const Dashboard = sequelize.define('Dashboard', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// // Define associations
// Dashboard.hasMany(Comment, {
//   foreignKey: 'dashboardId',
//   onDelete: 'CASCADE',
// });

// // Export the Dashboard model
// module.exports = Dashboard;
