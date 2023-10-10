import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Permission = sequelize.define('permission', {
  path: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: {
      msg: 'Permission path already in use',
    },
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Permission name already in use',
    },
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
});

export default Permission;
