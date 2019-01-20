const Router = require('koa-router');

const router = new Router();

router.get('/', require('./controllers/index'));
router.get('/login', require('./controllers/login'));

module.exports = router;