import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: {
      msg: 'Device id already in use',
    },
    validate: {
      isAlphanumeric: {
        msg: 'Device id must be alphanumeric only',
      },
    },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default Device;
