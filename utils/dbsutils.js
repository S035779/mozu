import std from './stdutils';

let tokens = [];
const appid = 'watch_note!'

/**
 * 
 *
 * @returns {undefined}
 */
const deleteToken = (client, callback) => {
  if(client.id !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  const isSuccess = delToken(client)
  if(!isSuccess) {
    callback({error: 'Delete Token Error!!'});
  }
  callback();
};
module.exports.deleteToken = deleteToken;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchToken = (client, callback) => {
  if(client.id !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  const token = hasToken(client);
  if(!token) {
    callback({error: 'Token not found!!'});
  }
  callback(null, token)
};
module.exports.fetchToken = fetchToken;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchTokens = (client, callback) => {
  if(client.id !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  callback(null, allToken())
};
module.exports.fetchTokens = fetchTokens;

/**
 * 
 *
 * @returns {undefined}
 */
const createToken = (client, callback) => {
  if(client.id !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  const newToken = {
    code:       std.makeRandStr(4)
    , token:    std.makeRandStr(8)
    , id_token: std.makeRandStr(16)
  };
  const isSuccess = hasToken(client)
    ? false : addToken(newToken);
  if(!isSuccess) {
    callback({error: 'Create Token Error!!'});
  }
  callback();
};
module.exports.createToken = createToken;

/**
 * 
 *
 * @returns {undefined}
 */
const refreshToken = (client, callback) => {
  if(client.id !== appid) {
    callback({error: 'Unknown AppID!!'}); 
    return;
  }
  const newToken = {
    code:       client.code
    , token:    std.makeRandStr(8)
    , id_token: std.makeRandStr(16)
  };
  const isSuccess = hasToken(client)
    ? updToken(client, newToken) : false;
  if(!isSuccess) {
    callback({error: 'Update Token Error!!'});
  }
  callback();
};
module.exports.refreshToken = refreshToken;

/**
 * 
 *
 * @returns {undefined}
 */
const hasToken = client => tokens.find(obj => obj.code === client.code);

/**
 * 
 *
 * @returns {undefined}
 */
const allToken = () => tokens;

/**
 * 
 *
 * @returns {undefined}
 */
const addToken = token => {
  tokens.push(token);
  return true;
};

/**
 * 
 *
 * @returns {undefined}
 */
const updToken = (client, token) => {
  tokens = tokens.map(obj => obj.code === client.code ? token : obj)
  return true;
};

/**
 * 
 *
 * @returns {undefined}
 */
const delToken = (client) => {
  tokens = tokens.filter(obj => obj.code !== client.code)
  return true;
};

