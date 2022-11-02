require('dotenv').config();

const createServer = require('./Infrastructures/http/createServer');

(async () => {
  const app = await createServer();

  app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
})();
