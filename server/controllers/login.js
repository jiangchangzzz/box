const request = require('request-promise-native');
const { QueryError, WXError } = require('../models/Error');
const config = require('../config');
const utils = require('../utils/index');

module.exports = async(ctx) => {
  const { code } = ctx.query;
  if(!code){
    throw new QueryError();
  }

  const req = await request({
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      appid: config.AppID,
      secret: config.AppSecret,
      js_code: code,
      grant_type: 'authorization_code'
    },
    json: true
  });

  if(req.errcode === 0){
    ctx.body = utils.createResponse({
      openid: req.openid
    });
  } else {
    throw new WXError(req.errmsg);
  }
};