import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Permission = sequelize.define('Permission', {
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: {
      msg: 'Permission name already in use',
    },
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default Permission;
