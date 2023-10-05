import express from 'express';
import cors from 'cors';

import Config from './config/config.mjs';
import { DBconnect } from './database/database.mjs';

import health from './middlewares/health.mjs';
import error from './middlewares/error.mjs';

import './models/_index.mjs';

import login from './routes/login.mjs';

const { port } = Config.server;

const app = express();

app.use(cors());
app.use(express.json());
app.use(health);

app.use(login);

app.use(error);

try {
  await DBconnect();
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
} catch (error) {
  console.error('Failed to start server: ', error);
  process.exit(-1);
}
