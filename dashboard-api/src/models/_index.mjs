import User from './User.mjs';
import Role from './Role.mjs';
import Permission from './Permission.mjs';
import Device from './Device.mjs';
import DeviceType from './DeviceType.mjs';
import UserDevices from './UserDevices.mjs';
import Config from './Config.mjs';
import Dashboard from './Dashboard.mjs';

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
UserDevices.belongsTo(DeviceType, {
  foreignKey: {
    allowNull: false,
  },
});

User.belongsToMany(Device, { through: UserDevices });
Device.belongsToMany(User, { through: UserDevices });

Permission.belongsToMany(Role, { through: 'rolepermissions' });
Role.belongsToMany(Permission, { through: 'rolepermissions' });

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
