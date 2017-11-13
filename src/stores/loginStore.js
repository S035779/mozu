import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `loginStore`;

class LoginStore extends ReduceStore {
  getInitialState() {
    return {
      selected: 0
      , title: ''
      , login: {
        selected: 0
        , title: ''
        , agree: false
      }
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'content/select/login':
        return Object.assign({}, state
          , { selected: action.selected, title: action.title });
      default:
        return state;
    }
  }
}

export default new LoginStore(dispatcher);
