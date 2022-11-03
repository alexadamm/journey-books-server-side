require('dotenv').config();

const container = require('./Infrastructures/container');
const createServer = require('./Infrastructures/http/createServer');

(async () => {
  const app = await createServer(container);

  app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
})();
