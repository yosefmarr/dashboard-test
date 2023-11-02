import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.JWT_SECRET,
  server: {
    port: process.env.SERVER_PORT,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === 'true' && console.log,
  },
};
