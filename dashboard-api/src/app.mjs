import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export default app;

// import Config from './config/config.mjs';
// import { DBconnect } from './database/database.mjs';

// import Health from './middlewares/health.mjs';
// import Error from './middlewares/error.mjs';

// import './models/_index.mjs';

// import Login from './routes/login.mjs';
// import User from './routes/user.mjs';

// const { port } = Config.server;

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(Health);

// app.use(Login);
// app.use('/user', User);

// app.use(Error);

// try {
//   await DBconnect();
//   app.listen(port, () => {
//     console.log(`Server listening on port: ${port}`);
//   });
// } catch (error) {
//   console.error('Failed to start server: ', error);
//   process.exit(-1);
// }
