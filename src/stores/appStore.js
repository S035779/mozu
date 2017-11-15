import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `appStore`;

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      selected: 0
      , title: ''
      , config: {
        selected: 0
        , title: ''
        , appid: ''
        , access_token: ''
        , id_token: ''
        , code: ''
        , refresh_token: ''
        , expires_in: ''
        , state: ''
        , token_type: ''
        , authApi: ''
        , findApi: ''
        , itemApi: ''
        , bidsApi: ''
        , watchApi1: ''
        , watchApi2: ''
      }
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'content/select/app':
        return Object.assign({}, state
          , { selected: action.selected, title: action.title });
      case 'config/fetch/appid':
        return Object.assign({}, state, {config: action.config});
      case 'config/write/appid':
        return Object.assign({}, state, {config: action.config});
      default:
        return state;
    }
  }
}

export default new AppStore(dispatcher);
