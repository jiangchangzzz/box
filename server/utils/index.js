const request = require('request-promise-native');
const logger = require('./logger');

exports.createResponse = (data, code = 0, message='成功', ext='') => {
  return {
    code: code,
    data: data,
    message: message,
    ext: ext
  }
}

exports.request = (data) => {
  return request(data)
    .then(res => {
      logger.log(res);
      return res;
    });
};