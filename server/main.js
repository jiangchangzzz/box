const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', require('./controllers/demo'));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);