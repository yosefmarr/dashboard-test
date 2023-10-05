import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const DeviceType = sequelize.define('DeviceType', {
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: {
      msg: 'Device type name already in use',
    },
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
});

export default DeviceType;
