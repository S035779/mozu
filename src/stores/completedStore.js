import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `completedStore`;

class CompletedStore extends ReduceStore {
  getInitialState() {
    return {
      page:             0 
      , items:          null
      , watch:          {}
      , url:            ''
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch/close':
        return Object.assign({}, state, {
          items: action.items
          , page: action.page
        });
      case 'id/fetch/watch/close':
        return Object.assign({}, state, {
          watch: action.watch
        });
      case 'item/create/watch/close':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      case 'item/delete/watch/close':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      default:
        return state;
    }
  }
}

export default new CompletedStore(dispatcher);
