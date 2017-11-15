import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `LoginAction`;

export default {
  selectedContent(selected, title) {
    log.info(`${pspid}>`, 'Response: content/select/login');
    dispatch({ type: 'content/select/login', selected, title });
  },
  authenticate() {
    return NoteApiClient.authenticate()
    .then(redirect_uri => {
      log.info(`${pspid}>`, 'Response: application/authenticate');
      dispatch({ type: 'application/authenticate'
        , isAuthenticated: true, redirect_uri });
    });
  },
  signout() {
    NoteApiClient.signout()
    .then(() => {
      log.info(`${pspid}>`, 'Response: application/signout');
      dispatch({ type: 'application/signout'
        , isAuthenticated: false });
    });
  },
}
