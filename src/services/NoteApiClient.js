import querystring from 'querystring';
import * as R from 'ramda';
import { M, log, spn, str, util } from '../../utils/webutils';
import xhr from '../../utils/xhrutils';
import std from '../../utils/stdutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `NoteAPIClient`;

let Yaho = {
  appid:        process.env.appid
  , appUrl:     process.env.appurl
  , authApi:    process.env.auth
  , findApi:    process.env.find
  , itemApi:    process.env.item
  , bidsApi:    process.env.bids
  , watchApi1:  process.env.wch1
  , watchApi2:  process.env.wch2
};

export default {
  request(action, response) {
    log.info(`${pspid}>`, 'Request:', `${action}`);
    switch(action) {
      case 'create/token':
        return new Promise(resolve => {
          const uri = appUrl + '/api/token';
          xhr.postJSON(uri, response, token => {
            resolve(token)
          });
        });
      case 'update/token':
        return new Promise(resolve => {
          const uri = appUrl + '/api/token';
          xhr.putJSON(uri, response, token => {
            resolve(token)
          });
        });
      case 'config':
        return new Promise(resolve => {
          const newToken = {
            access_token:     response.access_token
            , id_token:       response.id_token
            , code:           response.code
            , refresh_token:  ''
            , expires_in:     response.expires_in
          };
          Yaho = Object.assign({}, Yaho, newToken);
          resolve(Yaho);
        });
      case 'json/search':
        return new Promise(resolve => {
          JSONP.request(Yaho.findApi + action, response
          , ids => {
            resolve(ids);
          });
        });
      case 'json/auctionItem':
        return new Promise(resolve => {
          JSONP.request(Yaho.itemApi + action, response
          , Item => {
            resolve({ AuctionID: response.auctionID, Item });
          });
        });
      case 'BidHistory':
        return new Promise(resolve => {
          JSONP.request(Yaho.bidsApi + action, response
          , Bids => {
            resolve({ AuctionID: response.auctionID, Bids });
          });
        });
      case 'watchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi1 + action, response
          , Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'deleteWatchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi1 + action, response
          , Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'openWatchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi2 + action, response
          , ids => {
            resolve(ids);
          });
        });
      case 'closeWatchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi2 + action, response
          , ids => {
            resolve(ids);
          });
        });
      default:
        return new Promise(resolve => {
          resolve(response);
        });
    }
  },

  postSignIn() {
    return this.request('application/signin');
  },

  postSignOut() {
    return this.request('application/signoout');
  },

  postCreateToken(refresh_token) {
    return this.request('create/token'
      , {appid: Yaho.appid, code: refresh_token});
  },

  postUpdateToken(refresh_token) {
    return this.request('update/token'
      , {appid: Yaho.appid, code: refresh_token});
  },

  getConfig(token) {
    return this.request('config', token);
  },

  getIds(options, page) {
    return this.request('json/search'
      , this.helperOptions({ appid: Yaho.appid, page
        , output: 'json' }
      , options));
  },

  getItem(auctionID) {
    return this.request('json/auctionItem'
      , { auctionID, appid: Yaho.appid, output: 'json' });
  },

  getBids(auctionID) {
    return this.request('BidHistory'
      , { auctionID, appid: Yaho.appid, output: 'json' });
  },

  getCloseWatchIds(start, access_token) {
    return this.request('closeWatchList'
      , { start, output: 'json', access_token });
  },

  getOpenWatchIds(start, access_token) {
    return this.request('openWatchList'
      , { start, output: 'json', access_token });
  },

  postCreateWatch(access_token, auctionID) {
    spn.spin();
    return this.request('watchList'
      , { auctionID, output: 'json', access_token });
  },

  postDeleteWatch(access_token, auctionID) {
    spn.spin();
    return this.request('deleteWatchList'
      , { auctionID, output: 'json', access_token });
  },

  signin() {
    return this.postSignIn()
    .then(()=> {
      const options = new Object();
      options['response_type'] = 'code token id_token';
      options['client_id'] = Yaho.appid;
      options['redirect_uri'] = Yaho.appUrl;
      options['scope'] = 'openid';
      options['state'] = std.makeRandStr(8);
      options['nonce'] = std.makeRandStr(8);
      window.location.assign(Yaho.authApi + 'authorization' + '?'
        + querystring.stringify(options));
    });
  },

  signout() {
    return this.postSignOut();
  },

  fetchConfig(token) {
    return this.getConfig(token)
      .then(R.tap(this.traceLog.bind(this)))
      //.then(obj => this.postCreateToken(obj.code));
      //.catch(this.errorLog.bind(this));
  },

  fetchItems(options, page) {
    spn.spin();
    return this.getIds(options, page)
      .then(R.compose(this.setIds.bind(this)
        , this.resIds.bind(this)))
      .then(M.fork(R.concat
        , R.map(this.getItem.bind(this))
        , R.map(this.getBids.bind(this))
      ))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.setItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))
      ))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  fetchCloseWatch(start) {
    spn.spin();
    return this.getCloseWatchIds(start, Yaho.access_token)
      .then(R.compose(this.setWatchIds.bind(this)
        , this.resIds.bind(this)))
      .then(M.fork(R.concat
        , R.map(this.getItem.bind(this))
        , R.map(this.getBids.bind(this))
      ))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.setItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))
      ))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  fetchOpenWatch(start) {
    spn.spin();
    return this.getOpenWatchIds(start, Yaho.access_token)
      .then(R.compose(this.setWatchIds.bind(this)
        , this.resIds.bind(this)))
      .then(M.fork(R.concat
        , R.map(this.getItem.bind(this))
        , R.map(this.getBids.bind(this))
      ))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.setItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))
      ))
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  fetchWatchIds() {
    spn.spin();
    return this.getOpenWatchIds(1, Yaho.access_token)
      .then(this.resAttr)
      .then(this.forWatchIds.bind(this))
      .then(R.map(this.resIds.bind(this)))
      .then(R.map(this.setWatchIds.bind(this)))
      .then(R.flatten)
      .then(obj => {
        const newObj = {};
        R.forEach(id => newObj[id]=true, obj);
        return newObj;
      })
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  createWatch(auctionID) {
    return this.postCreateWatch(Yaho.access_token, auctionID)
      .then(this.setUrl)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  deleteWatch(auctionID) {
    return this.postDeleteWatch(Yaho.access_token, auctionID)
      .then(this.setUrl)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },

  forWatchIds(obj) {
    const { totalResultsAvailable, totalResultsReturned } = obj;
    const pages
      = Math.ceil(totalResultsAvailable / totalResultsReturned); 
    const promise = [];
    for(let i=0; i<pages; i++) {
      promise.push(this.getOpenWatchIds(i+1, Yaho.access_token))
    }
    return Promise.all(promise);
  },

  resAttr(obj) {
    const res = obj.ResultSet;
    return res.hasOwnProperty('@attributes')
      ? res['@attributes'] : null;
  },

  resIds(obj) {
    const res = obj.ResultSet;
    return res.hasOwnProperty('Result')
      ? res.Result : null;
  },

  resUrl(obj) {
    const res = obj.Url.ResultSet;
    return res.hasOwnProperty('Result')
      ? res.Result.watchListUrl : null;
  },

  setWatchIds(obj) {
    return Array.isArray(obj)
      ? R.map(id => id.AuctionID, obj) : [obj.AuctionID];
  },

  setItems(is, bs) {
    return R.map(i => {
      const b = R.filter(o => o.AuctionID === i.AuctionID, bs);
      return R.merge(i, b[0]);
    }, is);
  },

  setIds(obj) {
    return Array.isArray(obj.Item)
      ? R.map(id => id.AuctionID, obj.Item)
      : [obj.Item.AuctionID];
  },

  isItem(obj) {
    return obj.hasOwnProperty('Item');
  },

  isBids(obj) {
    return obj.hasOwnProperty('Bids');
  },

  helperOptions(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const _r = { new: 1, used: 2, other: 0 };
    const options = {
      appid:        _o.appid
      , query:      ''
      , output:     _o.output
      , page:       _o.page ? _o.page : 1
      , type:       'all'
      , order:      'a'
      , store:      0
      , gift_icon:  0
      , adf:        1
      , f:          '0x2'
    };

    if(_p.searchString) {
      options['query']      = _p.searchString;
    }
    
    if(_p.highestPrice) {
      options['aucmaxprice'] = Number(_p.highestPrice);
    }
    
    if(_p.lowestPrice) {
      options['aucminprice'] = Number(_p.lowestPrice);
    }
    
    if(_p.bids) {
      options['sort']        = 'bids';
    } else {
      options['sort']        = 'score';
      options['ranking']     = 'current';
    }
    
    if(_p.condition && _p.condition !== 'all') {
      options['item_status'] = Number(_r[_p.condition]);
    }
    
    if(_p.seller && _p.seller.length) {
      options['seller']      = _p.seller.join();
    }
    
    log.trace(`${pspid}>`, 'fetchIds options:', options);
    return options;
  },
  traceLog(obj) {
    return log.trace(`${pspid}>`, 'Trace log:', obj);
  },
  errorLog(err) {
    return log.error(`${pspid}>`, 'Error occurred:', err);
  },
}
