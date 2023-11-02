import { readdirSync } from 'fs';
import { basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db.mjs';
import { toPascalCase } from '../utils/formatter.mjs';

const baseFileName = basename(import.meta.url);
const db = {};

readdirSync(new URL('.', import.meta.url).pathname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== baseFileName &&
      file.slice(-4) === '.mjs'
    );
  })
  .forEach(async (file) => {
    const module = await import(
      join(new URL('.', import.meta.url).pathname, file)
    );
    const model = module.default(sequelize, DataTypes);
    db[toPascalCase(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  modelName = toPascalCase(modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
