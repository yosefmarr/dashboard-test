import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Dashboard = sequelize.define('dashboard', {
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  startingCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  minCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  maxCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Dashboard;
