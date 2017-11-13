import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `LoginAction`;

export default {
  selectedContent(selected, title) {
    log.info(`${pspid}>`, 'Response: content/select/login');
    dispatch({ type: 'content/select/login', selected, title });
  },
}
