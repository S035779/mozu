require('dotenv').config();
import std from './stdutils';
import htp from './netutils';
import {logs as log} from './logutils';

//Yahoo! OpenID API
const yconnect_v2 = process.env.auth;

/**
 * get result of the 'Yahoo! Auth Endpoints & support types.'.
 *
 * @param callback {function}
 */
const YHAuthSupport = (callback) => {
  const uri = yconnect_v2 + '.well-known/openid-configuration';
  htp.get2(uri, (status, header, body) => {
    const head = { request: uri, status, header };
    const res = JSON.parse(body);
    const obj = std.merge(head, { body: res });
    if(head.status !== 200) {
      YHerrorAuth(obj);
      callback(new Error('Response Error!!'));
    }
    const authApi = obj.body.authorization_endpoint;
    const toknApi = obj.body.token_endpoint;
    const userApi = obj.body.userinfo_endpoint;
    const jwksApi = obj.body.jwks_uri;
    const support = obj.body.response_types_supported;
    callback(null, {authApi, toknApi, userApi, jwksApi, support});
  });
};
module.exports.YHAuthSupport = YHAuthSupport;

/**
 * get result of the 'Yahoo! JWKs.'.
 *
 * @param callback {function}
 */
const YHJwks = (callback) => {
  const uri = yconnect_v2 + 'jwks';
  htp.get2(uri, (status, header, body) => {
    const head = { request: uri, status, header };
    const res = JSON.parse(body);
    const obj = std.merge(head, { body: res });
    if(head.status !== 200) {
      YHerrorAuth(obj);
      callback(new Error('Response Error!!'));
    }
    const set = obj.body.keys;
    const kids = set.map(o => ({
      keyid:       o.kid
      , modulus:   o.n
      , exponent:  o.e
    }));
    callback(null, kids);
  });
};
module.exports.YHJwks = YHJwks;

/**
 * get result of the 'Yahoo! Public Keys.'.
 *
 * @param callback {function}
 */
const YHPublicKeys = (callback) => {
  const uri = yconnect_v2 + 'public-keys';
  htp.get2(uri, (status, header, body) => {
    const head = { request: uri, status, header };
    const res = JSON.parse(body);
    const obj = std.merge(head, { body: res });
    if(head.status !== 200) {
      YHerrorAuth(obj);
      callback(new Error('Response Error!!'));
    }
    const set = obj.body;
    callback(null, set);
  });
};
module.exports.YHPublicKeys = YHPublicKeys;

/**
 * get result of the 'Yahoo! Authorization.'.
 *
 * @param options {object}
 * @param callback {function}
 */
const YHAccessToken = (options, request, callback) => {
  const uri = yconnect_v2 + 'token'
    + '?' + std.encodeFormData(options);
  const Authorization = 'Basic ' + std.atob(request['client_id']
    + ':' + request['client_secret']);
  log.trace(uri);
  htp.post2(uri, { Authorization }, {}, (status, header, body) => {
    const head = { request: uri, status, header };
    const res = JSON.parse(body);
    const obj = std.merge(head, { body: res });
    log.trace(obj);
    if(head.status !== 200) {
      YHerrorAuth(obj);
      callback(new Error('Response Error!!'));
    }
    const set = obj.body;
    callback(null, set);
  });
};
module.exports.YHAccessToken = YHAccessToken;

const YHerrorAuth = obj => {
  let code = new Object();
  code['nteraction_required'] = 'The Authorization Server requires End-User interaction of some form to proceed. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User interaction.';
  code['login_required'] = 'The Authorization Server requires End-User authentication. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User authentication.';
  code['account_selection_required'] = 'The End-User is REQUIRED to select a session at the Authorization Server. The End-User MAY be authenticated at the Authorization Server with different associated accounts, but the End-User did not select a session. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface to prompt for a session to use.';
  code['consent_required'] = 'The Authorization Server requires End-User consent. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User consent.'; 
  code['invalid_request_uri'] = 'The request_uri in the Authorization Request returns an error or contains invalid data.';
  code['invalid_request_object'] = 'The request parameter contains an invalid Request Object.';
  code['request_not_supported'] = 'The OP does not support use of the request parameter defined in Section 6.';
  code['request_uri_not_supported'] = 'The OP does not support use of the request_uri parameter defined in Section 6.';
  code['registration_not_supported'] = 'The OP does not support use of the registration parameter defined in Section 7.2.1.';
  return `Error code: ${obj.error}` 
    + `, response: ${code[obj.error]}`
    + `, description: ${obj.error_description}`
    + `, uri: ${obj.error_uri}`
    + `, status: ${obj.state}`
  ;
};

