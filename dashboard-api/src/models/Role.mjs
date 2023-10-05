import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Role = sequelize.define('role', {
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: {
      msg: 'Role name already in use',
    },
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default Role;
