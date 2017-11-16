import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `LoginAction`;

export default {
  selectedContent(selected, title) {
    log.info(`${pspid}>`, 'Response: content/select/login');
    dispatch({ type: 'content/select/login', selected, title });
  },
  signin() {
    return NoteApiClient.signin()
    .then(() => {
      log.info(`${pspid}>`, 'Response: application/signin');
      dispatch({ type: 'application/signin', isAuthenticated: true });
    });
  },
  signout() {
    return NoteApiClient.signout()
    .then(() => {
      log.info(`${pspid}>`, 'Response: application/signout');
      dispatch({ type: 'application/signout', isAuthenticated: false });
    });
  },
}
