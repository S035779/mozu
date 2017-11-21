import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `noteStore`;

class NoteStore extends ReduceStore {
  getInitialState() {
    return {
      page:             0 
      , items:          null
      , categorys:      []
      , watch:          {}
      , options: {
        searchString:   ''
        , highestPrice: ''
        , lowestPrice:  ''
        , bids:         false
        , condition:    'all'
        , AuctionID:    []
        , seller:       []
        , category:     ''
      }
      , url:     ''
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch/note':
        return Object.assign({}, state, {
          items:      action.items
          , options:  action.options
          , page:     action.page
        });
      case 'category/fetch/note':
        return Object.assign({}, state, {
          categorys:      action.categorys
        });
      case 'id/fetch/watch/note':
        return Object.assign({}, state, {
          watch: action.watch
        });
      case 'item/create/watch/note':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      case 'item/delete/watch/note':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      default:
        return state;
    }
  }
}

export default new NoteStore(dispatcher);
