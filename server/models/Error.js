class QueryError extends Error{
  constructor(ext=''){
    super();
    this.code = 1;
    this.message = '请求参数错误';
    this.ext = ext;
  }
}

class WXError extends Error{
  constructor(ext=''){
    super();
    this.code = 2;
    this.message = '微信服务器错误';
    this.ext = ext;
  }
}

module.exports = {
  QueryError,
  WXError
};