import { M, log, spn } from '../../utils/webutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `NoteAPIClient`;

const v1 = 'https://auctions.yahooapis.jp/AuctionWebService/V1/';
const v2 = 'https://auctions.yahooapis.jp/AuctionWebService/V2/';
const a2 = 'https://auth.login.yahoo.co.jp/yconnect/v2/';

const appid = process.env.app_id;
const redirect_uri = process.env.redirect_uri;

export default {
  request(action, response) {
    log.info(`${pspid}>`, 'Request:', `${action}`);
    switch(action) {
      case 'json/search':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
            resolve(ids);
          });
        });
      case 'json/auctionItem':
        //log.trace(`${pspid}>`, 'Get:', response);
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, Item => {
            resolve({ AuctionID: response.auctionID, Item });
          });
        });
      case 'BidHistory':
        //log.trace(`${pspid}>`, 'Get:', response);
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Bids => {
            resolve({ AuctionID: response.auctionID, Bids });
          });
        });
      case '.well-known/openid-configuration':
        return new Promise(resolve => {
          JSONP.request(a2 + action, response, config => {
            resolve(config);
          });
        });
      case 'authorization':
        return new Promise(resolve => {
          JSONP.request(a2 + action, response, auth => {
            resolve(auth);
          });
        });
      case 'watchList':
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'deleteWatchList':
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'openWatchList':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
            resolve(ids);
          });
        });
      case 'closeWatchList':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
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

  getIds(options, page) {
    return this.request('json/search'
      , this.helperOptions({ appid, page, output: 'json' }
      , options));
  },

  getItem(auctionID) {
    return this.request('json/auctionItem'
      , { auctionID, appid, output: 'json' });
  },

  getBids(auctionID) {
    return this.request('BidHistory'
      , { auctionID, appid, output: 'json' });
  },

  getConfig() {
    return this.request('.well-known/openid-configuration');
  },

  getAuth() {
    return this.request('authorization'
      , { response_type: 'token'
        , client_id: appid
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
