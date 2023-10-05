import User from './User.mjs';
import Role from './Role.mjs';
import Permission from './Permission.mjs';
import Device from './Device.mjs';
import DeviceType from './DeviceType.mjs';
import UserDevices from './UserDevices.mjs';
import Config from './Config.mjs';
import Dashboard from './Dashboard.mjs';

User.belongsToMany(Device, { through: UserDevices });
User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
  },
});
User.belongsTo(Config, {
  foreignKey: {
    allowNull: false,
  },
});
User.belongsTo(Dashboard, {
  foreignKey: {
    allowNull: false,
  },
});
Permission.belongsToMany(Role, { through: 'rolepermissions' });
Device.belongsToMany(User, { through: UserDevices });
UserDevices.belongsTo(DeviceType, {
  foreignKey: {
    allowNull: false,
  },
});

export default {
  User,
  Role,
  Permission,
  Device,
  DeviceType,
  UserDevices,
  Config,
  Dashboard,
};
