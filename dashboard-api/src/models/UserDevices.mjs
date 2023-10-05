import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';
import User from './User.mjs';
import Device from './Device.mjs';

const UserDevices = sequelize.define('userdevices', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  DeviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Device,
      key: 'id',
    },
  },
});

export default UserDevices;
