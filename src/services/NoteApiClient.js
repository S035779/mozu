import * as R from 'ramda';
import { M, log, spn, str, util } from '../../utils/webutils';
import xhr from '../../utils/xhrutils';
import std from '../../utils/stdutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `NoteAPIClient`;

let Yaho = new Object();

export default {
  request(action, response) {
    log.info(`${pspid}>`, 'Request:', `${action}`);
    switch(action) {
      case 'config/fetch':
        return new Promise(resolve => {
          const memory = window.localStorage
          || (window.UserDataStorage && new str.UserDataStorage())
          || new str.CookieStorage();
          Yaho = JSON.parse(memory.getItem("Yaho_config"));
          resolve(Yaho);
        });
      case 'config/write':
        return new Promise(resolve => {
          const memory = window.localStorage
          || (window.UserDataStorage && new str.UserDataStorage())
          || new str.CookieStorage();
          Yaho = response;
          memory.setItem("Yaho_config", JSON.stringify(response));
          resolve(Yaho);
        });
      case 'json/search':
        return new Promise(resolve => {
          JSONP.request(Yaho.findApi + action, response, ids => {
            resolve(ids);
          });
        });
      case 'json/auctionItem':
        return new Promise(resolve => {
          JSONP.request(Yaho.itemApi + action, response, Item => {
            resolve({ AuctionID: response.auctionID, Item });
          });
        });
      case 'BidHistory':
        return new Promise(resolve => {
          JSONP.request(Yaho.bidsApi + action, response, Bids => {
            resolve({ AuctionID: response.auctionID, Bids });
          });
        });
      case '.well-known/openid-configuration':
        return new Promise(resolve => {
          JSONP.request(authAPi + action, response, config => {
            resolve(config);
          });
        });
      case 'authorization':
        return new Promise(resolve => {
          JSONP.request(authApi + action, response, auth => {
            resolve(auth);
          });
        });
      case 'watchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'deleteWatchList':
        return new Promise(resolve => {
          JSONP.request(Taho.watchApi1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'openWatchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi2 + action, response, ids => {
            resolve(ids);
          });
        });
      case 'closeWatchList':
        return new Promise(resolve => {
          JSONP.request(Yaho.watchApi2 + action, response, ids => {
            resolve(ids);
          });
        });
      default:
        return new Promise(resolve => {
          log.warn(`${pspid}> Unknown request !!`);
          resolve(response);
        });
    }
  },

  getConfig() {
    return this.request('config/fetch');
  },

  getIds(options, page) {
    return this.request('json/search'
      , this.helperOptions({ appid: Yaho.appid, page, output: 'json' }
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

  getAuth() {
    return this.request('authorization'
      , { response_type: 'token'
        , client_id: Yaho.appid
        , redirect_uri
        , scope: 'openid' });
  },

  getCloseWatchIds(start, access_token) {
    return this.request('closeWatchList'
      , { start, output: 'json', access_token });
  },

  getOpenWatchIds(start, access_token) {
    return this.request('openWatchList'
      , { start, output: 'json', access_token });
  },

  putConfig(options) {
    return this.request('config/write', options);;
  },

  postWatch(access_token, auctionID) {
    spn.spin();
    return this.request('watchList'
      , { auctionID, output: 'json', access_token });
  },

  deleteWatch(access_token, auctionID) {
    spn.spin();
    return this.request('deleteWatchList'
      , { auctionID, output: 'json', access_token });
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
    const setItems = R.curry(this.fetchCloseWatchIds)(start);
    return this.fetchConfig()
    /*
      .then(this.fetchAuth)
      .then(setItems)
      .then(this.setItems.bind(this))
      .then(M.fork(R.concat
        , R.map(this.fetchItem.bind(this))
        , R.map(this.fetchBids.bind(this))))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.setItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))))
    */
      .then(R.tap(this.traceLog.bind(this)))
      //.catch(this.errorLog.bind(this));
  },

  fetchOpenWatch(start) {
    spn.spin();
    const setItems = R.curry(this.fetchOpenWatchIds)(start);
    return this.fetchConfig()
    /*
      .then(this.fetchAuth)
      .then(setItems)
      .then(this.setItems.bind(this))
      .then(M.fork(R.concat
        , R.map(this.fetchItem.bind(this))
        , R.map(this.fetchBids.bind(this))))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.setItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))))
    */
      .then(R.tap(this.traceLog.bind(this)))
      //.catch(this.errorLog.bind(this));
  },

  resIds(obj) {
    const res = obj.ResultSet;
    return res.hasOwnProperty('Result')
      ? res.Result : null;
  },

  setIds(obj) {
    const ids = obj.Item;
    return Array.isArray(ids)
      ? R.map(id => id.AuctionID, ids) : [ids.AuctionID];
  },

  isItem(obj) {
    return obj.hasOwnProperty('Item');
  },

  isBids(obj) {
    return obj.hasOwnProperty('Bids');
  },

  setItems(is, bs) {
    return R.map(i => {
      const b = R.filter(o => o.AuctionID === i.AuctionID, bs);
      return R.merge(i, b[0]);
    }, is);
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
