const utils = require('../utils/index');

const handleError = (option) => {
  return async(ctx, next) => {
    try{
      await next();
    } catch(error){
      ctx.body = utils.createResponse(null, 
        error.code || 500, 
        error.message || '服务器错误',
        error.ext);
    }
  }
};

module.exports = handleError;