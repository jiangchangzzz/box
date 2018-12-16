const Router = require('koa-router');

const router = new Router();

router.get('/login', require('./controllers/login'));

module.exports = router;