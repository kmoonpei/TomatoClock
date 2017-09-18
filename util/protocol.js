/**
 * 返回一个json字符串
 */
let jsonReturn = function(data='', message='', code=0) {
    let response = {};
    response.code = code;
    response.data = data;
    response.message = message;
    return JSON.stringify(response);
}

/**
 * 错误返回的简便调用
 */
let errorReturn = function(message='', code=1, data='') {
    return jsonReturn(data, message, code)
}

exports = module.exports =  jsonReturn

exports.error = errorReturn
