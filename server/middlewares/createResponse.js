const utils = require('../utils/index');

function createResponse (option){
  return async(ctx, next) => {
    await next();
    ctx.body = utils.createResponse(ctx.body);
  }
}

module.exports = createResponse;