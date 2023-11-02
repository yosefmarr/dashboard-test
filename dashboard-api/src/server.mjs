import app from './app.mjs';
import config from '../config/config.mjs';
import { connectSequelize } from './db.mjs';

const {
  server: { port },
} = config;

try {
  await connectSequelize();
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
} catch (error) {
  console.error('Failed to start server: ', error);
  process.exit(-1);
}
