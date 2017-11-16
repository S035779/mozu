require('dotenv').config();
import std from './stdutils';
import app from './apputils';
import {logs as log} from './logutils';

const AppUrl = process.env.app_url;
const AppID = process.env.app_id;
const Secret = process.env.secret;

log.config('console', 'color', 'note-app', 'ALL');

let tokens = [];

/**
 * 
 *
 * @returns {undefined}
 */
const fetchAuthSupport = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'});
  app.YHAuthSupport((err, set) => {
    if(err) callback(err);
    callback(set);
  });
};
module.exports.fetchAuthSupport = fetchAuthSupport;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchAuthJwks = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  app.YHJwks((err, set) => {
    if(err) callback(err);
    callback(set);
  });
};
module.exports.fetchAuthJwks = fetchAuthJwks;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchAuthPublicKeys = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  app.YHPublicKeys((err, set) => {
    if(err) callback(err);
    callback(set[client.keyid]);
  });
};
module.exports.fetchAuthPublicKeys = fetchAuthPublicKeys;

/**
 * 
 *
 * @returns {undefined}
 */
const createAuthToken = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  let options = new Object();
  options['grant_type'] = 'authorization_code';
  options['client_id'] = AppID;
  options['client_secret'] = Secret;
  options['redirect_uri'] = AppUrl;
  options['code'] = client.code;
  app.YHAccessToken(options, (err, set) => {
    if (err) callback(err);
    log.trace('Result:', set);
    const newToken = {
      code:             client.code
      , access_token:   set.access_token
      , refresh_token:  set.refresh_token
      , expires_in:     set.expires_in
      , id_token:       set.id_token
    };
    const isSuccess = hasToken(client)
      ? false : addToken(newToken);
    if(!isSuccess) callback({error: 'Create Token Error!!'});
    callback(newToken);
  });
};
module.exports.createAuthToken = createAuthToken;

/**
 * 
 *
 * @returns {undefined}
 */
const refreshAuthToken = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  let options = new Object();
  options['grant_type'] = 'refresh_token';
  options['client_id'] = AppID;
  options['client_secret'] = Secret;
  options['refresh_token'] = client.code;
  app.YHAccessToken(options, (err, set) => {
    if (err) callback(err);
    log.trace('Result:', set);
    const newToken = {
      code:             client.code
      , access_token:   set.access_token
      , refresh_token:  set.refresh_token
      , expires_in:     set.expires_in
      , id_token:       set.id_token
    };
    const isSuccess = hasToken(client)
      ? updToken(client, newToken) : false;
    if(!isSuccess) callback({error: 'Update Token Error!!'});
    callback(newToken);
  });
};
module.exports.refreshAuthToken = refreshAuthToken;

/**
 * 
 *
 * @returns {undefined}
 */
const deleteAuthToken = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  const isSuccess = delToken(client)
  if(!isSuccess) callback({error: 'Delete Token Error!!'});
  callback();
};
module.exports.deleteAuthToken = deleteAuthToken;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchAuthToken = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  const token = hasToken(client);
  if(!token) callback({error: 'Token not found!!'});
  callback(null, token)
};
module.exports.fetchAuthToken = fetchAuthToken;

/**
 * 
 *
 * @returns {undefined}
 */
const fetchAuthTokens = (client, callback) => {
  if(client.id !== AppID) callback({error: 'Unknown AppID!!'}); 
  callback(null, allToken())
};
module.exports.fetchAuthTokens = fetchAuthTokens;

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

