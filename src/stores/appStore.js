import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `appStore`;

class AppStore extends ReduceStore {
  getInitialState() {
    return {};
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      default:
        return state;
    }
  }
}

export default new AppStore(dispatcher);
