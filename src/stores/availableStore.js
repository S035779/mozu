import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `availableStore`;

class AvailableStore extends ReduceStore {
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
      case 'item/fetch/open':
        return Object.assign({}, state, {
          items: action.items
          , page: action.page
        });
      case 'id/fetch/watch/open':
        return Object.assign({}, state, {
          watch: action.watch
        });
      case 'item/create/watch/open':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      case 'item/delete/watch/open':
        return Object.assign({}, state, {
          watch: action.watch
          , url: action.url
        });
      default:
        return state;
    }
  }
}

export default new AvailableStore(dispatcher);
