/**
 * Main Server
 */

import app from './lib/express';
import config from './config';// consts

const app = express();

app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`);
});

export default app;