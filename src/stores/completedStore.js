import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `completedStore`;

class CompletedStore extends ReduceStore {
  getInitialState() {
    return {
      page:      0 
      , items:   null
      , options: {
        searchString: ''
        , highestPrice: ''
        , lowestPrice: ''
        , bids: false
        , condition: 'all'
        , AuctionID: []
        , seller: []
      }
      , url:     ''
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch/closewatch':
        return Object.assign({}, state
          , { items: action.items, page: action.page });
      case 'item/create/watch':
        return Object.assign({}, state, { url: action.url });
      case 'item/delete/watch':
        return Object.assign({}, state, { url: action.url });
      default:
        return state;
    }
  }
}

export default new CompletedStore(dispatcher);
