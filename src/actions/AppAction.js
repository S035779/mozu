import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `AppAction`;

export default {
  selectedContent(selected, title) {
    log.info(`${pspid}>`, 'Response: content/select/app');
    dispatch({ type: 'content/select/app', selected, title });
  },
  fetchConfig(obj) {
    return NoteApiClient.getConfig(obj)
    .then(config => {
      dispatch({ type: 'config/fetch/appid', config });
      log.info(`${pspid}>`, 'Response: config/fetch/appid');
      spn.stop();
    });
  },
  writeConfig(obj) {
    return NoteApiClient.putConfig(obj)
    .then(config => {
      dispatch({ type: 'config/write/appid', config });
      log.info(`${pspid}>`, 'Response: config/write/appid');
      spn.stop();
    });
  },
}
