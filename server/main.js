const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const router = require('./router');
const handleError = require('./middlewares/handleError');

const main = () => {
  const app = new Koa();

  app.use(bodyParser());
  app.use(logger());

  app.use(handleError());

  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server start: ${port}`);
  });
}

module.exports = main;
