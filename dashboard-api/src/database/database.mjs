import Sequelize from 'sequelize';
import Config from '../config/config.mjs';

const {
  host,
  port,
  database,
  username,
  password,
  logging,
  service: dialect,
} = Config.db;

const SequelizeInstance = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  logging,
  define: {
    freezeTableName: true,
  },
});

export const DBconnect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await SequelizeInstance.authenticate();
      await SequelizeInstance.sync();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export default SequelizeInstance;
