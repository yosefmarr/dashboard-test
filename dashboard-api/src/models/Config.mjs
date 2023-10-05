import { DataTypes } from 'sequelize';
import sequelize from '../database/database.mjs';

const Config = sequelize.define('config', {
  language: {
    type: DataTypes.ENUM,
    values: ['es', 'en'],
    defaultValue: 'es',
    allowNull: false,
  },
  sessionTimeOut: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Config;
